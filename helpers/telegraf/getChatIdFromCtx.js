function getChatIdFromCtx(ctx) {
    return ctx.update.message.chat.id
}

module.exports = getChatIdFromCtx;