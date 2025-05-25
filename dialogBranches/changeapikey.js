const getMessageFromCtx = require("../helpers/telegraf/getMessageFromCtx");
const getChatIdFromCtx = require("../helpers/telegraf/getChatIdFromCtx");
const verifyZuliprcConfig = require("../helpers/zulip/verifyZuliprcConfig");
const initCtxSession = require("../helpers/telegraf/initCtxSession");
const updateUserApiKey = require("../helpers/sqlite/updatings/updateUserApiKey");
const getZulipCredentialsByUserId = require("../helpers/sqlite/gettings/getZulipCredentialsByUserId");

async function processChangeApiKey(ctx, db){
    let newApiKey = getMessageFromCtx(ctx).text
    let foundUserCredentials = getZulipCredentialsByUserId(db, getChatIdFromCtx(ctx))

    if (!foundUserCredentials) {
        ctx.reply("You are not registered with Zulip credentials. Try unregister and register again!")
        initCtxSession(ctx, true);
        return;
    }

    const zulipVerifySuccess = await verifyZuliprcConfig({...foundUserCredentials, apiKey: newApiKey});

    if (!zulipVerifySuccess) {
        ctx.reply("Something is wrong with your api key. Try again later with another credentials")
        initCtxSession(ctx, true);
        return;
    }

    const success = updateUserApiKey(db, getChatIdFromCtx(ctx), newApiKey)
    if (success) {
        ctx.reply("Your api key for Zulip successfully updated!")
    } else {
        ctx.reply("Something went wrong when I try to save your new credentials!")
    }
    initCtxSession(ctx, true);

}

module.exports = processChangeApiKey