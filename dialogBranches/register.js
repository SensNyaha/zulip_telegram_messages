const getMessageFromCtx = require("../helpers/telegraf/getMessageFromCtx");
const verifyZuliprcConfig = require("../helpers/zulip/verifyZuliprcConfig");
const createNewUser = require("../helpers/sqlite/creatings/createNewUser");
const initCtxSession = require("../helpers/telegraf/initCtxSession");
const getChatIdFromCtx = require("../helpers/telegraf/getChatIdFromCtx");
const createNewZulipCredentials = require("../helpers/sqlite/creatings/createNewZulipCredentials");
const createNewUserFastReactions = require("../helpers/sqlite/creatings/createNewUserFastReactions");
const {ENTER_EMAIL, ENTER_ZULIP_URL, WRONG_CREDENTIALS, SMTHNG_WENT_WRONG, GOOD_CREDENTIALS, USER_CREATED,
    REGISTER_SUCCESS
} = require("../messagesCatalog/messages.cat");
const getUserLang = require("../helpers/sqlite/gettings/getUserLang");


async function processRegistration(ctx, db) {
    if (ctx.session.currentStageInfo.apiKey === null) {
        ctx.session.currentStageInfo.apiKey = getMessageFromCtx(ctx).text
        ctx.reply(ENTER_EMAIL[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else if (ctx.session.currentStageInfo.username === null) {
        ctx.session.currentStageInfo.username = getMessageFromCtx(ctx).text
        ctx.reply(ENTER_ZULIP_URL[getUserLang(db, getChatIdFromCtx(ctx))]);
    } else if (ctx.session.currentStageInfo.realm === null) {
        ctx.session.currentStageInfo.realm = getMessageFromCtx(ctx).text
        const verifyResult = await verifyZuliprcConfig({...ctx.session.currentStageInfo});
        if (!verifyResult) {
            ctx.reply(WRONG_CREDENTIALS[getUserLang(db, getChatIdFromCtx(ctx))]);
        } else {
            await ctx.reply(GOOD_CREDENTIALS[getUserLang(db, getChatIdFromCtx(ctx))]);
            const successAddingUser = createNewUser(db, getChatIdFromCtx(ctx))
            const successAddingUserFastReactions = createNewUserFastReactions(db, getChatIdFromCtx(ctx))
            if (successAddingUser && successAddingUserFastReactions) {
                ctx.reply(USER_CREATED[getUserLang(db, getChatIdFromCtx(ctx))]);

                const successAddingZulipCredentials = createNewZulipCredentials(db, getChatIdFromCtx(ctx), {...ctx.session.currentStageInfo}, true)
                if (successAddingZulipCredentials) {
                    ctx.reply(REGISTER_SUCCESS[getUserLang(db, getChatIdFromCtx(ctx))]);
                } else {
                    ctx.reply(SMTHNG_WENT_WRONG[getUserLang(db, getChatIdFromCtx(ctx))]);
                }
            } else {
                ctx.reply(SMTHNG_WENT_WRONG[getUserLang(db, getChatIdFromCtx(ctx))]);
            }
        }
        initCtxSession(ctx, true)
    }
}

module.exports = processRegistration