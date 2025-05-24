const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const BSqlite = require("better-sqlite3")

const getChatIdFromCtx = require("./helpers/telegraf/getChatIdFromCtx");

const { Telegraf,session } = require('telegraf')


const bot = new Telegraf(process.env.TG_BOT_KEY)

const {Redis} = require("@telegraf/session/redis")

const store = Redis({ url: process.env.REDIS_URL });

const sqliteDbFile = path.resolve(__dirname, 'sqlite3.db');
const db = new BSqlite(sqliteDbFile);

const initDB = require("./helpers/sqlite/initUsersTable");
initDB(db)

const isUserRegistered = require("./helpers/sqlite/isUserExist")

bot.use(session({ store }));


const initCtxSession = require("./helpers/telegraf/initCtxSession");
const processRegistration = require("./dialogBranches/register");
const deleteUser = require("./helpers/sqlite/deleteUser");
const processChangeApiKey = require("./dialogBranches/changeapikey");
const getUserById = require("./helpers/sqlite/getUserById");
const verifyZuliprcConfig = require("./helpers/zulip/verifyZuliprcConfig");
const processAllUsers = require("./helpers/app/processAllUsers");

bot.command("menu", async(ctx) => {
    ctx.reply('Choose command:', {
        reply_markup: {
            keyboard: [
                ['/register', '/unregister', "/verifyapikey", "/changeapikey", "/cancel"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
})

bot.command("cancel", async(ctx) => {
    initCtxSession(ctx, true);
})

bot.command("register", async(ctx) => {
    if (isUserRegistered(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are already registered!");
        return;
    }

    initCtxSession(ctx, false);
    if (ctx.session.currentStage === "register") {
        ctx.reply("You are now in register mode, follow previous step")
    } else {
        ctx.session.currentStage = "register"
        ctx.session.currentStageInfo = {
            apiKey: null,
            username: null,
            realm: null
        }
        ctx.reply("Enter your API KEY from ZULIP application")
    }
})

bot.command("unregister", async(ctx) => {
    if (!isUserRegistered(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are not registered yet!");
        return;
    }
    let success = deleteUser(db, getChatIdFromCtx(ctx))
    if (success) {
        ctx.reply("Your account successfully unregistered!");
    } else {
        ctx.reply("Something happened while i was trying to unregister you")
    }
})

bot.command("changeapikey", async(ctx) => {
    if (!isUserRegistered(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are not registered yet!");
        return;
    }

    initCtxSession(ctx, false);
    if (ctx.session.currentStage === "changeapikey") {
        ctx.reply("You are now in changeapikey mode, follow previous step")
    } else {
        ctx.session.currentStage = "changeapikey"
        ctx.session.currentStageInfo = null
        ctx.reply("Enter your NEW API KEY from ZULIP application")
    }
})


bot.command("verifyapikey", async(ctx) => {
    if (!isUserRegistered(db, getChatIdFromCtx(ctx))) {
        await ctx.reply("You are not registered yet!");
        return;
    }
    let result = getUserById(db, getChatIdFromCtx(ctx))
    initCtxSession(ctx, true);

    const zulipVerifySuccess = await verifyZuliprcConfig({
        apiKey: result.zulipKey,
        username: result.zulipEmail,
        realm: result.zulipSite,
    })

    if (!zulipVerifySuccess) {
        ctx.reply("Something is wrong with your api key. Seems like you changed it in the app. Renew it in my DB")
    } else {
        ctx.reply("Everything is cool!")
    }
})

bot.on("message", async (ctx) => {
    if (ctx.session?.currentStage === "register") {
        await processRegistration(ctx, db)
    } else if (ctx.session?.currentStage === "changeapikey") {
        await processChangeApiKey(ctx, db)
    } else {
        ctx.reply("UNKNOWN CONTEXT OF EXECUTION")
    }
})


bot.launch()


setInterval(processAllUsers, 5000, db)


// при создании пользователя запросить последнее событие, проверить прочитано ли оно, если нет, найти последнее прочитанное
// записать его в базу как идентификатор от которого будем плясать

// поставить автоматический запрос сообщений каждые 30 секунд (отсчет от последнего прочитанного айдишника пусть 5 штук в одном запросе)
// если результат пустой - выходим из функции
// если результат меньше чем емкость одного запроса - 
//      если в выводе ТОЛЬКО непрочитанные сообщения - добавить их в массив непрочитанных сообщений пользователя
//      если в выводе есть хотя бы одно прочитанное сообщение - добавить в массив только непрочитанные, сместить метку идентификатора последнего прочтенного события
//      
//      если в массиве непрочитанных сообщений пользователя уже есть сообщение с таким 
