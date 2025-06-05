const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const {SMTHNG_WENT_WRONG} = require("../../../messagesCatalog/messages.cat");
const getUserLang = require("../../sqlite/gettings/getUserLang");
const switchUserLang = require("../../sqlite/updatings/switchUserLang");
const createNewUserLang = require("../../sqlite/creatings/createNewUserLang");

const switchLang = async(ctx, db) => {
    let lang = getUserLang(db, getChatIdFromCtx(ctx));

    let newLang = "rus";
    let reply = `Вы переключили язык сообщений на: ${newLang}`

    if (lang === "rus") {
        newLang = "eng";
        reply = `You switched language to: ${newLang}`
    }

    createNewUserLang(db, getChatIdFromCtx(ctx))

    let success = switchUserLang(db, getChatIdFromCtx(ctx), newLang);
    if (success) {
        ctx.reply(reply);
    } else {
        ctx.reply(SMTHNG_WENT_WRONG[getUserLang(db, getChatIdFromCtx(ctx))]);
    }
}

module.exports = switchLang;