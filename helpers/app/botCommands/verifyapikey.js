const isUserExist = require("../../sqlite/checkings/isUserExist");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const initCtxSession = require("../../telegraf/initCtxSession");
const getZulipCredentialsByUserId = require("../../sqlite/gettings/getZulipCredentialsByUserId");
const convertZulipCredentialsFromDbToRequest = require("../../zulip/convertZulipCredentialsFromDbToRequest");
const verifyZuliprcConfig = require("../../zulip/verifyZuliprcConfig");

const verifyApiKey = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are not registered yet!");
        return;
    }

    initCtxSession(ctx, true);
    let foundZulipCredentials = getZulipCredentialsByUserId(db, getChatIdFromCtx(ctx))
    let requestZulipCredentials = convertZulipCredentialsFromDbToRequest(foundZulipCredentials);

    const zulipVerifySuccess = await verifyZuliprcConfig(requestZulipCredentials)

    if (!zulipVerifySuccess) {
        ctx.reply("Something is wrong with your api key. Seems like you changed it in the app. Renew it in my DB")
    } else {
        ctx.reply("Everything is cool!")
    }
}

module.exports = verifyApiKey;