const processRegistration = require("../../../dialogBranches/register");
const processChangeApiKey = require("../../../dialogBranches/changeapikey");

const messageEvent = async (ctx, db) => {
    if (ctx.session?.currentStage === "register") {
        await processRegistration(ctx, db)
    } else if (ctx.session?.currentStage === "changeapikey") {
        await processChangeApiKey(ctx, db)
    } else {
        ctx.reply("UNKNOWN CONTEXT OF EXECUTION")
    }
}

module.exports = messageEvent;