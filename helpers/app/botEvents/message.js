const processRegistration = require("../../../dialogBranches/register");
const processChangeApiKey = require("../../../dialogBranches/changeapikey");
const processChangeTimeout = require("../../../dialogBranches/changetimeout");
const {UNKNOWN_CONTEXT} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");

const messageEvent = async (ctx, db) => {
    if (ctx.session?.currentStage === "register") {
        await processRegistration(ctx, db)
    } else if (ctx.session?.currentStage === "changeapikey") {
        await processChangeApiKey(ctx, db)
    } else if (ctx.session?.currentStage === "changetimeout") {
        await processChangeTimeout(ctx, db)
    } else {
        ctx.reply(UNKNOWN_CONTEXT[getUserLang(db, getChatIdFromCtx(ctx))]);
    }
}

module.exports = messageEvent;