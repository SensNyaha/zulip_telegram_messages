const getMessageFromCtx = require("../helpers/telegraf/getMessageFromCtx");
const verifyZuliprcConfig = require("../helpers/zulip/verifyZuliprcConfig");
const createNewUser = require("../helpers/sqlite/creatings/createNewUser");
const initCtxSession = require("../helpers/telegraf/initCtxSession");
const getChatIdFromCtx = require("../helpers/telegraf/getChatIdFromCtx");
const createNewZulipCredentials = require("../helpers/sqlite/creatings/createNewZulipCredentials");
const createNewUserFastReactions = require("../helpers/sqlite/creatings/createNewUserFastReactions");


async function processRegistration(ctx, db) {
    if (ctx.session.currentStageInfo.apiKey === null) {
        ctx.session.currentStageInfo.apiKey = getMessageFromCtx(ctx).text
        ctx.reply("Enter your email - domain address")
    } else if (ctx.session.currentStageInfo.username === null) {
        ctx.session.currentStageInfo.username = getMessageFromCtx(ctx).text
        ctx.reply("Enter your zulip server url WITH A CLOSING SLASH IN THE END OF THE URL")
    } else if (ctx.session.currentStageInfo.realm === null) {
        ctx.session.currentStageInfo.realm = getMessageFromCtx(ctx).text
        const verifyResult = await verifyZuliprcConfig({...ctx.session.currentStageInfo});
        if (!verifyResult) {
            ctx.reply("There was an error while verifying your Zulip credentials. Try again with another credentials")
        } else {
            await ctx.reply("Your credentials is OK! Trying to save your data in my DB")
            const successAddingUser = createNewUser(db, getChatIdFromCtx(ctx))
            const successAddingUserFastReactions = createNewUserFastReactions(db, getChatIdFromCtx(ctx))
            if (successAddingUser && successAddingUserFastReactions) {
                ctx.reply("User successfully created. Trying to save your Zulip credentials in my DB")

                const successAddingZulipCredentials = createNewZulipCredentials(db, getChatIdFromCtx(ctx), {...ctx.session.currentStageInfo}, true)
                if (successAddingZulipCredentials) {
                    ctx.reply("Your Zulip credentials saved successfully. Registration process is finished!")
                } else {
                    ctx.reply("Something happened while i was trying to work with DB. Try again next time!")
                }
            } else {
                ctx.reply("Something happened while i was trying to work with DB. Try again next time!")
            }
        }
        initCtxSession(ctx, true)
    }
}

module.exports = processRegistration