const menu = async(ctx) => {
    ctx.reply('Choose action:', {
        reply_markup: {
            keyboard: [
                ['/register', '/unregister'],
                ["/verifyapikey", "/changeapikey"],
                ["/cancel"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
}

module.exports = menu;