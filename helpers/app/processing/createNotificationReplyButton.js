const createNotificationReplyButton = (zulipMessageId, reaction) => {
    return {
        text: `${reaction.type}: ${reaction.value}`,
        callback_data: `${zulipMessageId}___${reaction.type}: ${reaction.text_value}`
    }
}

module.exports = createNotificationReplyButton