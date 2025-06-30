const getUserById = require("../../sqlite/gettings/getUserById");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const switchUserFiringNotificationStatus = require("../../sqlite/updatings/switchUserFiringNotificationStatus");
const {
    FIRED_NOTIFICATIONS_DISABLED, FIRED_NOTIFICATIONS_ENABLED, SMTHNG_WENT_WRONG
} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");
const getUserFiringNotificationStatus = require("../../sqlite/gettings/getUserFiringNotificationStatus");
const createUserFiringNotificationStatus = require("../../sqlite/creatings/createUserFiringNotificationStatus");

const changeFires = async (ctx, db) => {
  const foundUser = getUserById(db, getChatIdFromCtx(ctx));
  if (!foundUser) {
    await ctx.reply(SMTHNG_WENT_WRONG[getUserLang(db, getChatIdFromCtx(ctx))]);
    return;
  }

  const result = getUserFiringNotificationStatus(db, getChatIdFromCtx(ctx));
  if (!result) {
    createUserFiringNotificationStatus(db, getChatIdFromCtx(ctx));
    await ctx.reply(FIRED_NOTIFICATIONS_ENABLED[getUserLang(db, getChatIdFromCtx(ctx))]);
    return;
  }

  switchUserFiringNotificationStatus(db, getChatIdFromCtx(ctx), Number(!result.notifyStatus));
  if (!!result.notifyStatus) {
    await ctx.reply(FIRED_NOTIFICATIONS_DISABLED[getUserLang(db, getChatIdFromCtx(ctx))]);
    return;
  }
  await ctx.reply(FIRED_NOTIFICATIONS_ENABLED[getUserLang(db, getChatIdFromCtx(ctx))]);
};

module.exports = changeFires;
