const getMessageFromCtx = require("../helpers/telegraf/getMessageFromCtx");
const initCtxSession = require("../helpers/telegraf/initCtxSession");
const getChatIdFromCtx = require("../helpers/telegraf/getChatIdFromCtx");
const getUserById = require("../helpers/sqlite/gettings/getUserById");
const updateUserNotifyTimeout = require("../helpers/sqlite/updatings/updateUserNotifyTimeout");

const {NOT_REGISTERED, SMTHNG_WENT_WRONG, WRONG_SEC_INPUT, SUCCESS_UPDATE_TIMEOUT} = require("../messagesCatalog/messages.cat");
const getUserLang = require("../helpers/sqlite/gettings/getUserLang");


async function processChangeTimeout(ctx, db) {
    let newTimeout = getMessageFromCtx(ctx).text

    if (isNaN(newTimeout)) {
        ctx.reply(WRONG_SEC_INPUT[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }

    let foundUser = getUserById(db, getChatIdFromCtx(ctx))

    if (!foundUser) {
        ctx.reply(NOT_REGISTERED[getUserLang(db, getChatIdFromCtx(ctx))]);
        initCtxSession(ctx, true);
        return;
    }

    const success = updateUserNotifyTimeout(db, getChatIdFromCtx(ctx), Number(newTimeout))
    if (success) {
        ctx.reply(SUCCESS_UPDATE_TIMEOUT[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else {
        ctx.reply(SMTHNG_WENT_WRONG[getUserLang(db, getChatIdFromCtx(ctx))])
    }
    initCtxSession(ctx, true);
}

module.exports = processChangeTimeout