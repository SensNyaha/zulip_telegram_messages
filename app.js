// импорты системных библиотек
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// импорт драйвера для работы с SQLite
const SQLite = require("better-sqlite3")

// импорт окружения для создания бота телеграм
const { Telegraf, session } = require('telegraf')
const { Redis } = require("@telegraf/session/redis")

// инициализация бота телеграм и хранилища для работы с сессионными данными
const bot = new Telegraf(process.env.TG_BOT_KEY)
const store = Redis({ url: process.env.REDIS_URL });
bot.use(session( store ));


// инициализация SQLite хранилища для приложения
const sqliteDbFile = path.resolve(__dirname, 'sqlite3.db');
const db = new SQLite(sqliteDbFile);

// инициализация таблиц базы данных
const initDB = require("./helpers/sqlite/initializings/initDB");
initDB(db)

// импорты функций для работы части логики
const menu = require("./helpers/app/botCommands/menu");
const cancel = require("./helpers/app/botCommands/cancel");
const help = require("./helpers/app/botCommands/help");
const register = require("./helpers/app/botCommands/register");
const unregister = require("./helpers/app/botCommands/unregister");
const changeApiKey = require("./helpers/app/botCommands/changeapikey");
const testRequest = require("./helpers/app/botCommands/testrequest");
const messageEvent = require("./helpers/app/botEvents/message");
const callbackQueryEvent = require("./helpers/app/botEvents/callbackQuery");


const processAllUsers = require("./helpers/app/processing/processAllUsers");
const freeze = require("./helpers/app/botCommands/freeze");
const unfreeze = require("./helpers/app/botCommands/unfreeze");
const changeTimeout = require("./helpers/app/botCommands/changetimeout");

bot.command("start", async (ctx) => menu(ctx))
bot.command("menu", async (ctx) => menu(ctx))
bot.command("help", async (ctx) => help(ctx, bot))
bot.command("cancel", async (ctx) => cancel(ctx))
bot.command("register", async (ctx) => register(ctx, db))
bot.command("unregister", async (ctx) => unregister(ctx, db))
bot.command("changeapikey", async (ctx) => changeApiKey(ctx, db))
bot.command("testrequest", async (ctx) => testRequest(ctx, db))
bot.command("freeze", async (ctx) => freeze(ctx, db));
bot.command("unfreeze", async (ctx) => unfreeze(ctx, db));
bot.command("switchlang", async (ctx) => ctx.reply("in new update"));
bot.command("changetimeout", async (ctx) => changeTimeout(ctx, db));

bot.on("message", async (ctx) => messageEvent(ctx, db));
bot.on("callback_query", async (ctx) => callbackQueryEvent(ctx, db, bot))

bot.launch()

setInterval(processAllUsers, 5000, db, bot)
//TODO: тут сделать раз в час проверку всех замороженных акков на валидность зулипных данных
//TODO: сделать возможность изменять список своих быстрых реакций
//TODO: добавить русский язык
