const initCtxSession = require("../../telegraf/initCtxSession");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const isUserExist = require("../../sqlite/checkings/isUserExist");
const {ALREADY_REGISTERED, REGISTER_MODE, ASK_APIKEY} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");

const register = async(ctx, db) => {
    if (isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply(ALREADY_REGISTERED[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }

    initCtxSession(ctx, false)
    if (ctx.session.currentStage === "register") {
        ctx.reply(REGISTER_MODE[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else {
        ctx.session.currentStage = "register"
        ctx.session.currentStageInfo = {
            apiKey: null,
            username: null,
            realm: null
        }
        ctx.reply(ASK_APIKEY[getUserLang(db, getChatIdFromCtx(ctx))])
    }
}

module.exports = register;