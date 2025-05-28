const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const fs = require("node:fs");
const {join} = require("node:path");

const help = async(ctx, bot) => {
    bot.telegram.sendMessage(getChatIdFromCtx(ctx), fs.readFileSync(join(process.cwd(), "help.md")), {
        parse_mode: "Markdown",
    }).catch((e) => {
        console.log(e)
    })
}

module.exports = help;