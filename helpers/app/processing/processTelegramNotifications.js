const getAllTelegramNotifications = require("../../sqlite/gettings/getAllTelegramNotifications");
const deleteTelegramNotification = require("../../sqlite/deletings/deleteTelegramNotification");
const deleteTelegramMessageAndNotification = require("./deleteTelegramMessageAndNotification");


const processTelegramNotifications = (db, bot, messages, user) => {
    const telegramNotifications = getAllTelegramNotifications(db, user.id)
    telegramNotifications.forEach(notification => {
        const found = messages.find(msg => msg.id === notification.zulip_message_id);
        if (!found) {
            deleteTelegramMessageAndNotification(db, bot, user.id, notification);
        }
    })
}

module.exports = processTelegramNotifications;