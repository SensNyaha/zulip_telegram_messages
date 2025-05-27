const EmojiConvertor = require('emoji-js');
const emoji = new EmojiConvertor();

function convertToEmoji(text) {
    emoji.replace_mode = 'unified';
    emoji.allow_native = true;

    return emoji.replace_colons(text);
}

module.exports = convertToEmoji