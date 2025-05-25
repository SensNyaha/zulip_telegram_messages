const initCtxSession = require("../../telegraf/initCtxSession");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const isUserExist = require("../../sqlite/checkings/isUserExist");

const register = async(ctx, db) => {
    if (isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are already registered!");
        return;
    }

    initCtxSession(ctx, false)
    if (ctx.session.currentStage === "register") {
        ctx.reply("You are now in register mode, follow previous step")
    } else {
        ctx.session.currentStage = "register"
        ctx.session.currentStageInfo = {
            apiKey: null,
            username: null,
            realm: null
        }
        ctx.reply("Enter your API key from Zulip application")
    }
}

module.exports = register;