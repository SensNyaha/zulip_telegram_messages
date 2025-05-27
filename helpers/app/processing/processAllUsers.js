const fetchUsersUnreadMessages = require("./fetchUsersUnreadMessages");
const getAllZulipCredentials = require("../../sqlite/gettings/getAllZulipCredentials");
const convertZulipCredentialsFromDbToRequest = require("../../zulip/convertZulipCredentialsFromDbToRequest");
const increaseZulipCredentialsFailedAttempts = require("../../sqlite/updatings/increaseZulipCredentialsFailedAttempts");
const unverifyZulipCredentials = require("../../sqlite/updatings/unverifyZulipCredentials");
const getUserById = require("../../sqlite/gettings/getUserById");
const processUnreadMessages = require("./processUnreadMessages");
const processTelegramNotifications = require("./processTelegramNotifications");


async function processAllUsers(db, bot){
    const zulipCredentials = getAllZulipCredentials(db);
    for (const userCredentials of zulipCredentials) {
        // специально не выполняю ожидание выполнения через await, чтобы запустить процессинг параллельно
        processUserByCredentials(db, bot, userCredentials);
    }
}

async function processUserByCredentials(db, bot, userCredentials) {
    if (userCredentials.verified === 0) return;

    const user = getUserById(db, userCredentials.user_id);
    if (user.frozen > 0) return;

    let messages = await fetchUsersUnreadMessages(convertZulipCredentialsFromDbToRequest(userCredentials), 1000);
    if (messages === null) {
        increaseZulipCredentialsFailedAttempts(db, userCredentials.user_id);
        if (userCredentials.failed_attempts > 1440) {
            unverifyZulipCredentials(db, userCredentials.user_id);
        }
        return;
    }

    processUnreadMessages(db, bot, messages, user)
    processTelegramNotifications(db, bot, messages, user)
}

module.exports = processAllUsers