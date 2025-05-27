const getFastReactionById = require("../../sqlite/gettings/getFastReactionById");
const createNotificationReplyButton = require("./createNotificationReplyButton");

const createNotificationReplyKeyboard = (db, zulipMessageId, userFastReactions) => {
    if (!userFastReactions) {
        return {}
    }

    return {
        reply_markup: {
            inline_keyboard: [
                [
                    createNotificationReplyButton(zulipMessageId, getFastReactionById(db, userFastReactions.reaction_1)),
                    createNotificationReplyButton(zulipMessageId, getFastReactionById(db, userFastReactions.reaction_2)),
                    createNotificationReplyButton(zulipMessageId, getFastReactionById(db, userFastReactions.reaction_3)),
                    createNotificationReplyButton(zulipMessageId, getFastReactionById(db, userFastReactions.reaction_4)),
                ]
            ]
        }
    }
}

module.exports = createNotificationReplyKeyboard