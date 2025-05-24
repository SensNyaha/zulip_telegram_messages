const getMessageFromCtx = require("../helpers/telegraf/getMessageFromCtx");
const verifyZuliprcConfig = require("../helpers/zulip/verifyZuliprcConfig");
const addNewUser = require("../helpers/sqlite/addNewUsers");
const initCtxSession = require("../helpers/telegraf/initCtxSession");


async function processRegistration(ctx, db) {
    if (ctx.session.currentStageInfo.apiKey === null) {
        ctx.session.currentStageInfo.apiKey = getMessageFromCtx(ctx).text
        ctx.reply("Enter your email - domain address")
    } else if (ctx.session.currentStageInfo.username === null) {
        ctx.session.currentStageInfo.username = getMessageFromCtx(ctx).text
        ctx.reply("Enter your zulip server url")
    } else if (ctx.session.currentStageInfo.realm === null) {
        ctx.session.currentStageInfo.realm = getMessageFromCtx(ctx).text
        const verifyResult = await verifyZuliprcConfig({...ctx.session.currentStageInfo});
        if (!verifyResult) {
            ctx.reply("There was an error while verifying your Zulip credits. Try again with another credits")
        } else {
            await ctx.reply("Your credits is OK! Trying to save your data in my DB")
            const success = addNewUser(db, ctx.update.message.chat.id, JSON.stringify(ctx.session.currentStageInfo))
            if (success) {
                ctx.reply("Nicely DONE")
            } else {
                ctx.reply("Something happened while i was trying to work with DB. Try again next time!")
            }
        }
        initCtxSession(ctx, true)
    }
}

module.exports = processRegistration