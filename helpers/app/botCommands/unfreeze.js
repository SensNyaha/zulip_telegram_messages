const getUserById = require("../../sqlite/gettings/getUserById");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const unfreezeUser = require("../../sqlite/updatings/unfreezeUser");


const unfreeze = async(ctx, db) => {
    const foundUser = getUserById(db, getChatIdFromCtx(ctx))
    if (!foundUser || foundUser.isFrozen === 0) {
        await ctx.reply("You are already unfrozen or you dont exist");
        return;
    }

    const result = unfreezeUser(db, getChatIdFromCtx(ctx))
    if (!result) {
        await ctx.reply("There was an error while trying to unfreeze you");
        return;
    }

    ctx.reply("You was unfrozen successfully");
}

module.exports = unfreeze;