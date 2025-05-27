const zulipInit = require('zulip-js');

async function markMessageWithEmoji(zuliprcObj, messageId, emojiName) {
    try {
        const zulip = await zulipInit(zuliprcObj);
        const response = await zulip.reactions.add({
            message_id: messageId,
            emoji_name: emojiName
        })

        return response
    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = markMessageWithEmoji