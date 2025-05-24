function filterReadMessages(messages) {
    return messages?.filter(ms => !ms.flags.includes("read"))
}

module.exports = filterReadMessages