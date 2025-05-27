const zulipInit = require('zulip-js');
const markMessageIsRead = require("./markMessageIsRead");

async function replyWithQuotedMessage(zuliprcObj, messageId, reply) {
    try {
        const zulip = await zulipInit(zuliprcObj);
        const messageInfo = await zulip.messages.retrieve({
            anchor: messageId,
            num_before: 0,
            num_after: 0,
            apply_markdown: false
        });
        const message = messageInfo.messages[0];
        if (!message) {
            throw new Error('Сообщение не найдено');
        }

        let sendParams;
        if (message.type === 'stream') {
            const replyMessageContent = ``+
                `@_**${message.sender_full_name}|${message.sender_id}** [писал/а](${zuliprcObj.realm}#narrow/channel/${message.display_recipient}/topic/${message.subject}/near/${message.id}):\n` +
                `\`\`\`quote\n` +
                `${message.content}\n` +
                `\`\`\`\n` +
                `${reply}`;
            sendParams = {
                to: message.stream_id,
                type: 'stream',
                subject: message.subject,
                content: replyMessageContent
            };
        } else if (message.type === 'private') {
            const replyMessageContent = ``+
                `@_**${message.sender_full_name}|${message.sender_id}** [писал/а](${zuliprcObj.realm}#narrow/dm/${message.display_recipient[0].id},${message.display_recipient[1].id}-dm/near/${message.id}):\n` +
                `\`\`\`quote\n` +
                `${message.content}\n` +
                `\`\`\`\n` +
                `${reply}`;

            sendParams = {
                to: message.display_recipient.map(recipient => recipient.email),
                type: 'private',
                content: replyMessageContent
            };
        } else {
            throw new Error('Неизвестный тип сообщения');
        }

        let response = await zulip.messages.send(sendParams);
        let result = await markMessageIsRead(zuliprcObj, response.id);
        return response
    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = replyWithQuotedMessage