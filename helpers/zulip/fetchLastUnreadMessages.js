const zulipInit = require('zulip-js');

async function fetchLastUnreadMessages(zuliprcObj, count) {
    try {
        const zulip = await zulipInit(zuliprcObj);
        const response = await zulip.messages.retrieve({
            anchor: "newest",
            num_before: count,
            num_after: 0,
            narrow: [
                //{operator: 'is', operand: 'private'},
                {operator: 'is', operand: 'unread'}
            ]
        })

        if (response.result !== "success") {
            throw new Error("Error while fetching messages")
        }
        return response.messages
    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = fetchLastUnreadMessages
