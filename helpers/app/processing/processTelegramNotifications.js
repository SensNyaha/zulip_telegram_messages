const getAllTelegramNotifications = require("../../sqlite/gettings/getAllTelegramNotifications");
const deleteTelegramNotification = require("../../sqlite/deletings/deleteTelegramNotification");


const processTelegramNotifications = (db, bot, messages, user) => {
    const telegramNotifications = getAllTelegramNotifications(db, user.id)
    telegramNotifications.forEach(notification => {
        const found = messages.find(msg => msg.id === notification.zulip_message_id);
        if (!found) {
            bot.telegram.deleteMessage(user.id, notification.telegram_notify_id)
                .catch(err => {
                    console.log(err)
                }).finally(() => {
                deleteTelegramNotification(db, user.id, notification.zulip_message_id);
            })
        }
    })
}

module.exports = processTelegramNotifications;