const getAllUsers = require("../sqlite/getAllUsers");
const fetchUsersUnreadMessages = require("./fetchUsersUnreadMessages");
const getUserUnreadMessages = require("../sqlite/getUserUnreadMessages");
const setUserUnreadMessages = require("../sqlite/setUserUnreadMessages");

async function processAllUsers(db){
    const usersList = await getAllUsers(db)
    for (const user of usersList) {
        let messages = await fetchUsersUnreadMessages(JSON.parse(user.zulip_credits), 100)
        if (messages === null) return;
        //const unreadFromDB = JSON.parse(getUserUnreadMessages(db, user.id) || "[]");
        setUserUnreadMessages(db, user.id, JSON.stringify(messages))
    }
}

module.exports = processAllUsers