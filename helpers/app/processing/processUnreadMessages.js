const getTelegramNotification = require("../../sqlite/gettings/getTelegramNotification");
const createNotificationReplyKeyboard = require("./createNotificationReplyKeyboard");
const createNewTelegramNotification = require("../../sqlite/creatings/createNewTelegramNotification");
const getUserFastReactions = require("../../sqlite/gettings/getUserFastReactions");

const processUnreadMessages = (db, bot, messages, user) => {
    const userFastReactions = getUserFastReactions(db, user.id);

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
}

module.exports = processUnreadMessages;