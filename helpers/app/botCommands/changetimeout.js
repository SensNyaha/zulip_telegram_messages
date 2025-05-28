const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const initCtxSession = require("../../telegraf/initCtxSession");
const isUserExist = require("../../sqlite/checkings/isUserExist");

const changeTimeout = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are not registered yet!");
        return;
    }

    initCtxSession(ctx, false);
    if (ctx.session.currentStage === "changetimeout") {
        ctx.reply("You are now in changetimeout mode, follow previous step")
    } else {
        ctx.session.currentStage = "changetimeout"
        ctx.session.currentStageInfo = null
        ctx.reply("Enter your new notification timeout in seconds")
    }
}

module.exports = changeTimeout;