const deleteTelegramNotification = require("../../sqlite/deletings/deleteTelegramNotification");

function deleteTelegramMessageAndNotification(db, bot, userId, notificationObj) {
    bot.telegram.deleteMessage(userId, notificationObj.telegram_notify_id)
        .catch((e) => {
            console.log(e.message)
        })
        .finally(() => {
            deleteTelegramNotification(db, userId, notificationObj.zulip_message_id)
        })
}

module.exports = deleteTelegramMessageAndNotification;