const zulipInit = require('zulip-js');

async function markMessageIsRead(zuliprcObj, messageId) {
    try {
        const zulip = await zulipInit(zuliprcObj);
        const response = await zulip.messages.flags.add({
            messages: [messageId],
            flag: "read"
        })

        return response
    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = markMessageIsRead