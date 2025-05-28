const getTelegramNotification = require("../../sqlite/gettings/getTelegramNotification");
const createNotificationReplyKeyboard = require("./createNotificationReplyKeyboard");
const createNewTelegramNotification = require("../../sqlite/creatings/createNewTelegramNotification");
const getUserFastReactions = require("../../sqlite/gettings/getUserFastReactions");
const formatTimeLocalized = require("../others/formatTime");
const convertToEmoji = require("./convertToEmoji");


const processUnreadMessages = async (db, bot, messages, user) => {
    const userFastReactions = getUserFastReactions(db, user.id);

    for (const msg of messages) {
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
            telegramMessageContent = `*${choppedMsg.sender_full_name} sent you in ${formatTimeLocalized(choppedMsg.timestamp * 1000)}*\n\n${choppedMsg.content}`;
        } else if (choppedMsg.type === "stream") {
            telegramMessageContent = `*${choppedMsg.sender_full_name} sent in ${choppedMsg.display_recipient} in ${formatTimeLocalized(choppedMsg.timestamp * 1000)}*\n\n${choppedMsg.content}`;
        } else {
            telegramMessageContent = JSON.stringify(choppedMsg);
        }

        if ((Date.now() / 1000 - msg.timestamp) >= user.notify_timeout_sec) {
            const notification = getTelegramNotification(db, user.id, msg.id);
            if (!notification) {
                let res;
                try {
                    res = await bot.telegram.sendMessage(user.id,
                        convertToEmoji(telegramMessageContent),
                        {
                            ...createNotificationReplyKeyboard(db, choppedMsg.id, userFastReactions),
                            parse_mode: "MarkdownV2"
                        })
                } catch (error) {
                    try {
                        res = await bot.telegram.sendMessage(user.id,
                            convertToEmoji(telegramMessageContent),
                            {
                                ...createNotificationReplyKeyboard(db, choppedMsg.id, userFastReactions),
                                parse_mode: "Markdown"
                            })
                    } catch (error) {
                        await bot.telegram.sendMessage(user.id,
                            convertToEmoji(telegramMessageContent),
                            {
                                ...createNotificationReplyKeyboard(db, choppedMsg.id, userFastReactions),
                            })
                    }
                }
                res && createNewTelegramNotification(db, user.id, msg.id, res.message_id)
            }
        }
    }
}

module.exports = processUnreadMessages;