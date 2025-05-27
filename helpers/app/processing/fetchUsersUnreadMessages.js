const zulipInit = require('zulip-js');
const filterUsersMessagesFromResponse = require('./filterUsersMessagesFromResponse');

async function fetchUsersUnreadMessages(zulipCredentials, count) {
    try {
        const zulip = await zulipInit(zulipCredentials);
        const response = await zulip.messages.retrieve({
            anchor: "newest",
            num_before: count,
            num_after: 0,
            narrow: [
                //{operator: 'is', operand: 'private'},
                {operator: 'is', operand: 'unread'}
            ],
            apply_markdown: false
        })
        if (response.result !== "success") {
            throw new Error("Error while fetching messages")
        }

        const filtered = filterUsersMessagesFromResponse(response.messages, zulipCredentials.username);

        return filtered
    } catch (e) {
        console.log(zulipCredentials.username, e.message)
        return null
    }
}

module.exports = fetchUsersUnreadMessages