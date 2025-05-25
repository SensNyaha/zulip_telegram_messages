const isUserExist = require("../../sqlite/checkings/isUserExist");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const deleteUser = require("../../sqlite/deletings/deleteUser");

const unregister = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are not registered yet!");
        return;
    }
    let success = deleteUser(db, getChatIdFromCtx(ctx))
    if (success) {
        ctx.reply("Your account successfully unregistered!");
    } else {
        ctx.reply("Something happened while i was trying to unregister you")
    }
}

module.exports = unregister;