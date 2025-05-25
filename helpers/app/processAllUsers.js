const getAllUsers = require("../sqlite/gettings/getAllUsers");
const fetchUsersUnreadMessages = require("./fetchUsersUnreadMessages");
const { Markup } = require("telegraf");

async function processAllUsers(db, bot){
    const usersList = await getAllUsers(db)
    for (const user of usersList) {
        let messages = await fetchUsersUnreadMessages(JSON.parse(user.zulip_credentials), 100)
        if (messages === null) return;

        let timeoutedMessages = messages.filter(message => Date.now() - message.timestamp >= user.notify_timeout_sec);

        let notifiedMessagesIds = JSON.parse(user.notified_message_ids) || {};
        let notNotifiedMessages = timeoutedMessages.filter(message => !notifiedMessagesIds[message.id])

        for (const message of notNotifiedMessages) {
            await bot.telegram.sendMessage(user.id, message.content, {
                reply_markup: {
                    inline_keyboard: [
                        JSON.parse(user.fast_reactions).map(reaction => ({text: reaction, callback_data: `${message.id}:${reaction}`}))
                    ]
                    // здесь обновить данные у записи (user.notifiedMessagesIds)
                }
            })
        }
    }
}

module.exports = processAllUsers