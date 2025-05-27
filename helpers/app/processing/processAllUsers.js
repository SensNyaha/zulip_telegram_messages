const fetchUsersUnreadMessages = require("./fetchUsersUnreadMessages");
const getAllZulipCredentials = require("../../sqlite/gettings/getAllZulipCredentials");
const convertZulipCredentialsFromDbToRequest = require("../../zulip/convertZulipCredentialsFromDbToRequest");
const increaseZulipCredentialsFailedAttempts = require("../../sqlite/updatings/increaseZulipCredentialsFailedAttempts");
const unverifyZulipCredentials = require("../../sqlite/updatings/unverifyZulipCredentials");
const getUserById = require("../../sqlite/gettings/getUserById");
const createNewTelegramNotification = require("../../sqlite/creatings/createNewTelegramNotification");
const getTelegramNotification = require("../../sqlite/gettings/getTelegramNotification");
const getAllTelegramNotifications = require("../../sqlite/gettings/getAllTelegramNotifications");
const deleteTelegramNotification = require("../../sqlite/deletings/deleteTelegramNotification");
const getUserFastReactions = require("../../sqlite/gettings/getUserFastReactions");
const createNotificationReplyKeyboard = require("./createNotificationReplyKeyboard");


async function processAllUsers(db, bot){
    const zulipCredentials = getAllZulipCredentials(db);
    for (const userCredentials of zulipCredentials) {
        // TODO: сделать функцию для каждого пользователя АСИНХРОННОЙ чтобы запускать обработку параллельно
        if (userCredentials.verified === 0) return;

        const user = getUserById(db, userCredentials.user_id);
        if (user.frozen > 0) return;

        const userFastReactions = getUserFastReactions(db, userCredentials.user_id);

        let messages = await fetchUsersUnreadMessages(convertZulipCredentialsFromDbToRequest(userCredentials), 1000);
        if (messages === null) {
            increaseZulipCredentialsFailedAttempts(db, userCredentials.user_id);
            if (userCredentials.failed_attempts > 1440) {
                unverifyZulipCredentials(db, userCredentials.user_id);
            }
            return;
        }

        messages.forEach(msg => {
            let choppedMsg = {
                id: msg.id,
                content: msg.content,
                timestamp: msg.timestamp,
                sender_full_name: msg.sender_full_name,
                display_recipient: msg.display_recipient,
                type: msg.type,
                avatar_url: msg.avatar_url,
            };

            let telegramMessageContent;
            if (choppedMsg.type === "private") {
                telegramMessageContent = `${choppedMsg.sender_full_name} sent you in ${new Date(choppedMsg.timestamp * 1000).toString()}\n${choppedMsg.content}`;
            } else if (choppedMsg.type === "stream") {
                telegramMessageContent = `${choppedMsg.sender_full_name} sent in ${choppedMsg.display_recipient} in ${new Date(choppedMsg.timestamp * 1000).toString()}\n${choppedMsg.content}`;
            } else {
                telegramMessageContent = JSON.stringify(choppedMsg);
            }

            if ((Date.now() / 1000 - msg.timestamp) >= user.notify_timeout_sec) {
                const notification = getTelegramNotification(db, user.id, msg.id);
                if (!notification) {
                    bot.telegram.sendMessage(user.id, telegramMessageContent, createNotificationReplyKeyboard(db, choppedMsg.id, userFastReactions))
                        .then(res => {
                            createNewTelegramNotification(db, user.id, msg.id, res.message_id)
                        })
                }
            }
        })

        const telegramNotifications = getAllTelegramNotifications(db, user.id)
        telegramNotifications.forEach(notification => {
            const found = messages.find(msg => msg.id === notification.zulip_message_id);
            if (!found) {
                bot.telegram.deleteMessage(user.id, notification.telegram_notify_id)
                    .catch(err => {
                        deleteTelegramNotification(db, user.id, notification.zulip_message_id);
                    }).finally(() => {
                        deleteTelegramNotification(db, user.id, notification.zulip_message_id);
                    })
            }
        })
    }
}

module.exports = processAllUsers