const getUserById = require("../../sqlite/gettings/getUserById");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const freezeUser = require("../../sqlite/updatings/freezeUser");
const {
  ALREADY_FROZEN,
  FREEZE_FAILED,
  FREEZE_SUCCESS,
} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");

const freeze = async (ctx, db) => {
  const foundUser = getUserById(db, getChatIdFromCtx(ctx));
  if (!foundUser || foundUser.isFrozen === 1) {
    await ctx.reply(ALREADY_FROZEN[getUserLang(db, getChatIdFromCtx(ctx))]);
    return;
  }

  const result = freezeUser(db, getChatIdFromCtx(ctx));
  if (!result) {
    await ctx.reply(FREEZE_FAILED[getUserLang(db, getChatIdFromCtx(ctx))]);
    return;
  }

  ctx.reply(FREEZE_SUCCESS[getUserLang(db, getChatIdFromCtx(ctx))]);
};

module.exports = freeze;
