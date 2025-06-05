const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const initCtxSession = require("../../telegraf/initCtxSession");
const isUserExist = require("../../sqlite/checkings/isUserExist");
const {NOT_REGISTERED, CHANGEAPIKEY_MODE, ASK_NEWAPIKEY} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");

const changeApiKey = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply(NOT_REGISTERED[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }

    initCtxSession(ctx, false);
    if (ctx.session.currentStage === "changeapikey") {
        ctx.reply(CHANGEAPIKEY_MODE[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else {
        ctx.session.currentStage = "changeapikey"
        ctx.session.currentStageInfo = null
        ctx.reply(ASK_NEWAPIKEY[getUserLang(db, getChatIdFromCtx(ctx))]);
    }
}

module.exports = changeApiKey;