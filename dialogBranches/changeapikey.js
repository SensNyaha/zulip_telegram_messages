const getMessageFromCtx = require("../helpers/telegraf/getMessageFromCtx");
const getChatIdFromCtx = require("../helpers/telegraf/getChatIdFromCtx");
const verifyZuliprcConfig = require("../helpers/zulip/verifyZuliprcConfig");
const initCtxSession = require("../helpers/telegraf/initCtxSession");
const updateUserApiKey = require("../helpers/sqlite/updatings/updateUserApiKey");
const getZulipCredentialsByUserId = require("../helpers/sqlite/gettings/getZulipCredentialsByUserId");
const getUserLang = require("../helpers/sqlite/gettings/getUserLang")

const {NOT_REGISTERED, WRONG_API_KEY, SUCCESS_UPDATE_API_KEY, SMTHNG_WENT_WRONG} = require("../messagesCatalog/messages.cat");

async function processChangeApiKey(ctx, db){
    let newApiKey = getMessageFromCtx(ctx).text
    let foundUserCredentials = getZulipCredentialsByUserId(db, getChatIdFromCtx(ctx))

    if (!foundUserCredentials) {
        ctx.reply(NOT_REGISTERED[getUserLang(db, getChatIdFromCtx(ctx))])
        initCtxSession(ctx, true);
        return;
    }

    const zulipVerifySuccess = await verifyZuliprcConfig({...foundUserCredentials, apiKey: newApiKey});

    if (!zulipVerifySuccess) {
        ctx.reply(WRONG_API_KEY[getUserLang(db, getChatIdFromCtx(ctx))]);
        initCtxSession(ctx, true);
        return;
    }

    const success = updateUserApiKey(db, getChatIdFromCtx(ctx), newApiKey)
    if (success) {
        ctx.reply(SUCCESS_UPDATE_API_KEY[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else {
        ctx.reply(SMTHNG_WENT_WRONG[getUserLang(db, getChatIdFromCtx(ctx))]);
    }
    initCtxSession(ctx, true);

}

module.exports = processChangeApiKey