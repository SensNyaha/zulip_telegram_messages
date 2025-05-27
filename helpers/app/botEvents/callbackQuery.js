const getZulipCredentialsByUserId = require("../../sqlite/gettings/getZulipCredentialsByUserId");
const markMessageIsRead = require("../../zulip/markMessageIsRead");
const convertZulipCredentialsFromDbToRequest = require("../../zulip/convertZulipCredentialsFromDbToRequest");
const markMessageWithEmoji = require("../../zulip/markMessageWithEmoji");
const replyWithQuotedMessage = require("../../zulip/replyWithQuotedMessage");
const deleteTelegramMessageAndNotification = require("../processing/deleteTelegramMessageAndNotification");


const callbackQueryEvent = async (ctx, db, bot) => {
    const query = ctx.update.callback_query

    const authorId = query.from.id;
    const data = query.data;
    const telegramMessageId = query.message.message_id;

    const [zulipMessageId, reaction] = data.split("___")
    const [reactionType, reactionValue] = reaction.split(": ")

    const userZulipCredentials = getZulipCredentialsByUserId(db, authorId);

    if (reactionType === "Read") {
        const result = await markMessageIsRead(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +zulipMessageId);
        if (result && result.result === "success") {
            deleteTelegramMessageAndNotification(db, bot, authorId, {telegram_notify_id: telegramMessageId, zulip_message_id: zulipMessageId})
        }
    } else if (reactionType === "React") {
        const result1 = await markMessageIsRead(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +zulipMessageId);
        const result2 = await markMessageWithEmoji(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +zulipMessageId, reactionValue)
        if (result1 && result1.result === "success" && result2 && result2.result === "success") {
            deleteTelegramMessageAndNotification(db, bot, authorId, {telegram_notify_id: telegramMessageId, zulip_message_id: zulipMessageId})
        }
    } else if (reactionType === "Reply") {
        const result1 = await markMessageIsRead(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +zulipMessageId);
        const result2 = await replyWithQuotedMessage(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +zulipMessageId, reactionValue);
        if (result1 && result1.result === "success" && result2 && result2.result === "success") {
            deleteTelegramMessageAndNotification(db, bot, authorId, {telegram_notify_id: telegramMessageId, zulip_message_id: zulipMessageId})
        }
    }
}

module.exports = callbackQueryEvent