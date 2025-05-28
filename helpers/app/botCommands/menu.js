const menu = async(ctx) => {
    ctx.reply('Choose action:', {
        reply_markup: {
            keyboard: [
                ["/help"],
                ['/register', '/unregister'],
                ["/testrequest", "/changeapikey"],
                ["/freeze", "/unfreeze"],
                ["/changetimeout", "/switchlang"],
                ["/cancel"]
            ],
            resize_keyboard: true,
        },
    });
}

module.exports = menu;