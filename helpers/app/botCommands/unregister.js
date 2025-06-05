const isUserExist = require("../../sqlite/checkings/isUserExist");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const deleteUser = require("../../sqlite/deletings/deleteUser");
const {NOT_REGISTERED, SMTHNG_WENT_WRONG, UNREGISTER_SUCCESS} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");

const unregister = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply(NOT_REGISTERED[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }
    let success = deleteUser(db, getChatIdFromCtx(ctx))
    if (success) {
        ctx.reply(UNREGISTER_SUCCESS[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else {
        ctx.reply(SMTHNG_WENT_WRONG[getUserLang(db, getChatIdFromCtx(ctx))]);
    }
}

module.exports = unregister;