const zulipInit = require('zulip-js');

async function verifyZuliprcConfig(zuliprcObj) {
    try {
        const zulip = await zulipInit(zuliprcObj);
        const response = await zulip.messages.retrieve({anchor: "newest",num_after: 0,num_before: 0,})
        if (response && response.result === "success") return true
        else return false
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = verifyZuliprcConfig