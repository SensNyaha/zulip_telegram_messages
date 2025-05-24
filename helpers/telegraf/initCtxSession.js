function initCtxSession(ctx, force) {
    let basicCtxSession = {
        currentStage: null,
        currentStageInfo: null
    }
    if (force || !ctx.session) {
        ctx.session = basicCtxSession
    }
}

module.exports = initCtxSession