const isUserExist = require("../../sqlite/checkings/isUserExist");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const initCtxSession = require("../../telegraf/initCtxSession");
const getZulipCredentialsByUserId = require("../../sqlite/gettings/getZulipCredentialsByUserId");
const convertZulipCredentialsFromDbToRequest = require("../../zulip/convertZulipCredentialsFromDbToRequest");
const verifyZuliprcConfig = require("../../zulip/verifyZuliprcConfig");
const getUserById = require("../../sqlite/gettings/getUserById");
const {NOT_REGISTERED, ACC_IS_FROZEN, CORRUPTED_ACC, OLD_APIKEY, ALL_IS_GOOD} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");

const testRequest = async(ctx, db) => {
    if (!isUserExist(db, getChatIdFromCtx(ctx))) {
        await ctx.reply(NOT_REGISTERED[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }

    initCtxSession(ctx, true);
    let foundUser = getUserById(db, getChatIdFromCtx(ctx));
    if (foundUser.isFrozen === 1) {
        ctx.reply(ACC_IS_FROZEN[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }
    let foundZulipCredentials = getZulipCredentialsByUserId(db, getChatIdFromCtx(ctx))
    if (foundZulipCredentials.verified === 0) {
        ctx.reply(CORRUPTED_ACC[getUserLang(db, getChatIdFromCtx(ctx))]);
        return;
    }

    let requestZulipCredentials = convertZulipCredentialsFromDbToRequest(foundZulipCredentials);
    const zulipVerifySuccess = await verifyZuliprcConfig(requestZulipCredentials)

    if (!zulipVerifySuccess) {
        ctx.reply(OLD_APIKEY[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else {
        ctx.reply(ALL_IS_GOOD[getUserLang(db, getChatIdFromCtx(ctx))]);
    }
}

module.exports = testRequest;