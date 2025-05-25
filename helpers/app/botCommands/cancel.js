const initCtxSession = require("../../telegraf/initCtxSession");

const cancel = async(ctx) => {
    initCtxSession(ctx, true);
}

module.exports = cancel;