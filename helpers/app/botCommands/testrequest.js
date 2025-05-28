const isUserExist = require("../../sqlite/checkings/isUserExist");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const initCtxSession = require("../../telegraf/initCtxSession");
const getZulipCredentialsByUserId = require("../../sqlite/gettings/getZulipCredentialsByUserId");
const convertZulipCredentialsFromDbToRequest = require("../../zulip/convertZulipCredentialsFromDbToRequest");
const verifyZuliprcConfig = require("../../zulip/verifyZuliprcConfig");
const getUserById = require("../../sqlite/gettings/getUserById");

const testRequest = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are not registered yet!");
        return;
    }

    initCtxSession(ctx, true);
    let foundUser = getUserById(db, getChatIdFromCtx(ctx));
    if (foundUser.isFrozen === 1) {
        ctx.reply("Your account is frozen. Unfreeze it first and try again!");
        return;
    }
    let foundZulipCredentials = getZulipCredentialsByUserId(db, getChatIdFromCtx(ctx))
    if (foundZulipCredentials.verified === 0) {
        ctx.reply("Your zulip credentials was corrupted. Exec /changeapikey and try again!");
        return;
    }

    let requestZulipCredentials = convertZulipCredentialsFromDbToRequest(foundZulipCredentials);
    const zulipVerifySuccess = await verifyZuliprcConfig(requestZulipCredentials)

    if (!zulipVerifySuccess) {
        ctx.reply("Something is wrong with your api key. Seems like you changed it in the app. Renew it in my DB")
    } else {
        ctx.reply("Everything works fine!")
    }
}

module.exports = testRequest;