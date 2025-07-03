const convertZulipCredentialsFromDbToRequest = require("../../zulip/convertZulipCredentialsFromDbToRequest");
const zulipInit = require('zulip-js');
const getAllZulipCredentials = require("../../sqlite/gettings/getAllZulipCredentials");
const getFiredEmployeeById = require("../../sqlite/gettings/getFiredEmployeeById");
const createNewFiredEmployee = require("../../sqlite/creatings/createNewFiredEmployee");
const getUserById = require("../../sqlite/gettings/getUserById");
const getUserFiringNotificationStatus = require("../../sqlite/gettings/getUserFiringNotificationStatus");
const {USER_WAS_FIRED} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");

async function getFiredUsers(db, bot) {
    const zulipCredentials = getAllZulipCredentials(db);

    for (const userCredentials of zulipCredentials) {
        if (userCredentials.verified === 1) {
            const resultOfNewFiredEmployees = await fetchFiredUsersWithCredentials(db, userCredentials);
            if (resultOfNewFiredEmployees && resultOfNewFiredEmployees.length > 0) {
            for (let userCredentials of zulipCredentials) {
                console.log(userCredentials.username)
                if (userCredentials.verified === 1 && getUserById(db, userCredentials.user_id)?.isFrozen === 0 && getUserFiringNotificationStatus(db, userCredentials.user_id)?.notifyStatus === 1) {
                    resultOfNewFiredEmployees.forEach(async (fired) => {
                        await bot.telegram.sendMessage(userCredentials.user_id, USER_WAS_FIRED[getUserLang(db, userCredentials.user_id)] + " - " + fired.full_name)
                    })
                }
            }
            return;
        }
        }
    }

    
}

async function fetchFiredUsersWithCredentials(db, userCredentials) {
    try {
        const zulip = await zulipInit(convertZulipCredentialsFromDbToRequest(userCredentials));
        const response = await zulip.users.retrieve()
        if (response.result !== "success") {
            throw new Error("Error while fetching fired users")
        }
        const filtered = response.members.filter(item => !item.is_active && !item.is_bot);
        const newFiltered = filtered.filter(item => {
            const user = getFiredEmployeeById(db, item.user_id);
            return !user
        })

        newFiltered.forEach(fired => {
            createNewFiredEmployee(db, fired.user_id, fired.full_name, new Date().toISOString());
        })

        return newFiltered
    } catch (e) {
        console.log(userCredentials.username, e.message)
        return null
    }
}

module.exports = getFiredUsers