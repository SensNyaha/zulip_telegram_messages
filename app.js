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
const register = require("./helpers/app/botCommands/register");
const unregister = require("./helpers/app/botCommands/unregister");
const changeApiKey = require("./helpers/app/botCommands/changeapikey");
const verifyApiKey = require("./helpers/app/botCommands/verifyapikey");
const messageEvent = require("./helpers/app/botEvents/message");

const processAllUsers = require("./helpers/app/processing/processAllUsers");


bot.command("menu", async (ctx) => menu(ctx))
bot.command("cancel", async (ctx) => cancel(ctx))
bot.command("register", async (ctx) => register(ctx, db))
bot.command("unregister", async (ctx) => unregister(ctx, db))
bot.command("changeapikey", async (ctx) => changeApiKey(ctx, db))
bot.command("verifyapikey", async (ctx) => verifyApiKey(ctx, db))

bot.on("message", async (ctx) => messageEvent(ctx, db));


// bot.on("callback_query", async (ctx) => {
//     console.log(ctx.update.callback_query)
//     // здесь надо обработать действия пользователей по нажатию кнопок под уведомлениями о сообщениях
// })
bot.launch()


//
setInterval(processAllUsers, 5000, db, bot)
//TODO: тут сделать раз в час проверку всех замороженных акков на валидность зулипных данных

//
// setInterval(() => {
//     let unreads = db.prepare(`
//         SELECT id, unread_messages
//         FROM users
//     `).all()
//     if (unreads.length === 0) return
//     let unreadOfFirst = JSON.parse(unreads[0].unread_messages)
//     unreadOfFirst?.forEach(async (unread) => {
//         if (!messagesId.includes(unread.id)) {
//             let {message_id} = await bot.telegram.sendMessage(unreads[0].id, unread.content)
//             messagesId.push(unread.id)
//
//             setTimeout(() => {
//                 bot.telegram.deleteMessage(unreads[0].id, message_id)
//             }, 5000)
//         }
//     })
//
//
// }, 5000)