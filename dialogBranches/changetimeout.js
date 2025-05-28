const getMessageFromCtx = require("../helpers/telegraf/getMessageFromCtx");
const initCtxSession = require("../helpers/telegraf/initCtxSession");
const getChatIdFromCtx = require("../helpers/telegraf/getChatIdFromCtx");
const getUserById = require("../helpers/sqlite/gettings/getUserById");
const updateUserNotifyTimeout = require("../helpers/sqlite/updatings/updateUserNotifyTimeout");


async function processChangeTimeout(ctx, db) {
    let newTimeout = getMessageFromCtx(ctx).text

    if (isNaN(newTimeout)) {
        ctx.reply("You entered wrong value. Enter value in seconds. Try again!");
        return;
    }

    let foundUser = getUserById(db, getChatIdFromCtx(ctx))

    if (!foundUser) {
        ctx.reply("You are not registered yet")
        initCtxSession(ctx, true);
        return;
    }

    const success = updateUserNotifyTimeout(db, getChatIdFromCtx(ctx), Number(newTimeout))
    if (success) {
        ctx.reply("Your notification timeout has been upgraded!")
    } else {
        ctx.reply("Something went wrong when I try to save your new notify timeout!")
    }
    initCtxSession(ctx, true);
}

module.exports = processChangeTimeout