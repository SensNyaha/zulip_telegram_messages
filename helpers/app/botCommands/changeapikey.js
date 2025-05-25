const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const initCtxSession = require("../../telegraf/initCtxSession");
const isUserExist = require("../../sqlite/checkings/isUserExist");

const changeApiKey = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are not registered yet!");
        return;
    }

    initCtxSession(ctx, false);
    if (ctx.session.currentStage === "changeapikey") {
        ctx.reply("You are now in changeapikey mode, follow previous step")
    } else {
        ctx.session.currentStage = "changeapikey"
        ctx.session.currentStageInfo = null
        ctx.reply("Enter your NEW API KEY from Zulip application")
    }
}

module.exports = changeApiKey;