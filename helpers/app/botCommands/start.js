const createNewUserLang = require("../../sqlite/creatings/createNewUserLang");
const getChatIdFromCtx = require("../../telegraf/getChatIdFromCtx");
const menu = require("./menu");

const start = async(ctx, db) => {
    createNewUserLang(db, getChatIdFromCtx(ctx))
    menu(ctx);
}

module.exports = start;