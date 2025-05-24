function filterUsersMessagesFromResponse(messagesArray, senderEmail) {
    return messagesArray.filter(msg => msg.sender_email !== senderEmail)
}

module.exports = filterUsersMessagesFromResponse