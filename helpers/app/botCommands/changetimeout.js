const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const initCtxSession = require("../../telegraf/initCtxSession");
const isUserExist = require("../../sqlite/checkings/isUserExist");
const {NOT_REGISTERED, CHANGETIMEOUT_MODE, ASK_NEWTIMEOUT} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");

const changeTimeout = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply(NOT_REGISTERED[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }

    initCtxSession(ctx, false);
    if (ctx.session.currentStage === "changetimeout") {
        ctx.reply(CHANGETIMEOUT_MODE[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else {
        ctx.session.currentStage = "changetimeout"
        ctx.session.currentStageInfo = null
        ctx.reply(ASK_NEWTIMEOUT[getUserLang(db, getChatIdFromCtx(ctx))]);
    }
}

module.exports = changeTimeout;