const getMessageFromCtx = require("../helpers/telegraf/getMessageFromCtx");
const getUserById = require("../helpers/sqlite/getUserById");
const getChatIdFromCtx = require("../helpers/telegraf/getChatIdFromCtx");
const verifyZuliprcConfig = require("../helpers/zulip/verifyZuliprcConfig");
const initCtxSession = require("../helpers/telegraf/initCtxSession");
const changeUserApiKey = require("../helpers/sqlite/changeUserApiKey");

async function processChangeApiKey(ctx, db){
    let newApiKey = getMessageFromCtx(ctx).text
    let result = getUserById(db, getChatIdFromCtx(ctx))

    let zuliprcConfigObject = JSON.parse(result.zulip_credits);
    zuliprcConfigObject.apiKey = newApiKey;

    const zulipVerifySuccess = await verifyZuliprcConfig(zuliprcConfigObject)

    if (!zulipVerifySuccess) {
        ctx.reply("Something is wrong with your api key. Try again later with another credits")
        initCtxSession(ctx, true);
        return;
    }

    const success = changeUserApiKey(db, result.id, newApiKey)
    if (success) {
        ctx.reply("Your api key for ZULIP successfully updated!")
    } else {
        ctx.reply("Something went wrong when I try to save your new credits!")
    }
    initCtxSession(ctx, true);

}

module.exports = processChangeApiKey