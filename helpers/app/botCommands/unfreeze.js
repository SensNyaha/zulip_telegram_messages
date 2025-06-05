const getUserById = require("../../sqlite/gettings/getUserById");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const unfreezeUser = require("../../sqlite/updatings/unfreezeUser");
const {ALREADY_UNFROZEN, UNFREEZE_FAILED, UNFREEZE_SUCCESS} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");


const unfreeze = async(ctx, db) => {
    const foundUser = getUserById(db, getChatIdFromCtx(ctx))
    if (!foundUser || foundUser.isFrozen === 0) {
        await ctx.reply(ALREADY_UNFROZEN[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }

    const result = unfreezeUser(db, getChatIdFromCtx(ctx))
    if (!result) {
        await ctx.reply(UNFREEZE_FAILED[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }

    ctx.reply(UNFREEZE_SUCCESS[getUserLang(db, getChatIdFromCtx(ctx))]);
}

module.exports = unfreeze;