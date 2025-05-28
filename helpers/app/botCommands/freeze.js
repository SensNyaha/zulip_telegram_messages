const getUserById = require("../../sqlite/gettings/getUserById");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const freezeUser = require("../../sqlite/updatings/freezeUser");


const freeze = async(ctx, db) => {
    const foundUser = getUserById(db, getChatIdFromCtx(ctx))
    if (!foundUser || foundUser.isFrozen === 1) {
        await ctx.reply("You are already frozen or you dont exist");
        return;
    }

    const result = freezeUser(db, getChatIdFromCtx(ctx))
    if (!result) {
        await ctx.reply("There was an error while trying to freeze you");
        return;
    }

    ctx.reply("You are frozen successfully");
}

module.exports = freeze;