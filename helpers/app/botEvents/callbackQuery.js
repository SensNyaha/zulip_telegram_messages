const getZulipCredentialsByUserId = require("../../sqlite/gettings/getZulipCredentialsByUserId");
const markMessageIsRead = require("../../zulip/markMessageIsRead");
const convertZulipCredentialsFromDbToRequest = require("../../zulip/convertZulipCredentialsFromDbToRequest");
const markMessageWithEmoji = require("../../zulip/markMessageWithEmoji");
const replyWithQuotedMessage = require("../../zulip/replyWithQuotedMessage");


const callbackQueryEvent = async (ctx, db, bot) => {
    const query = ctx.update.callback_query

    const authorId = query.from.id;
    const data = query.data;
    const telegramMessageId = query.message.message_id;

    const [messageId, reaction] = data.split("___")
    const [reactionType, reactionValue] = reaction.split(": ")

    const userZulipCredentials = getZulipCredentialsByUserId(db, authorId);

    if (reactionType === "Read") {
        const result = await markMessageIsRead(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +messageId);
        if (result && result.result === "success") {
            try {
                await bot.telegram.deleteMessage(authorId, telegramMessageId)
            } catch (e) {
                console.log(e.message)
            }
        }
    } else if (reactionType === "React") {
        const result1 = await markMessageIsRead(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +messageId);
        const result2 = await markMessageWithEmoji(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +messageId, reactionValue)
        if (result1 && result1.result === "success" && result2 && result2.result === "success") {
            try {
                await bot.telegram.deleteMessage(authorId, telegramMessageId)
            } catch (e) {
                console.log(e.message)
            }
        }
    } else if (reactionType === "Reply") {
        const result1 = await markMessageIsRead(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +messageId);
        const result2 = await replyWithQuotedMessage(convertZulipCredentialsFromDbToRequest(userZulipCredentials), +messageId, reactionValue);
        if (result1 && result1.result === "success" && result2 && result2.result === "success") {
            try {
                await bot.telegram.deleteMessage(authorId, telegramMessageId)
            } catch (e) {
                console.log(e.message)
            }
        }
    }
}

module.exports = callbackQueryEvent