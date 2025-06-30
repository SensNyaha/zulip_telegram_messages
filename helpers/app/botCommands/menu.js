const menu = async(ctx) => {
    ctx.reply('Выберите действие [Choose action] :', {
        reply_markup: {
            keyboard: [
                ["/help"],
                ['/register', '/unregister'],
                ["/testrequest", "/changeapikey"],
                ["/freeze", "/unfreeze"],
                ["/changetimeout", "/switchlang"],
                ["/changefires", "/cancel"]
            ],
            resize_keyboard: true,
        },
    });
}

module.exports = menu;