function escapeMarkdownV2(text) {
    const specialChars = [
        '_', '*', '[', ']', '(', ')', '~', '`', '>',
        '#', '+', '-', '=', '|', '{', '}', '.', '!'
    ];
    // Экранируем специальные символы для regex
    const escapedChars = specialChars.map(c => `\\${c}`).join('');
    return text.replace(new RegExp(`([${escapedChars}])`, 'g'), '\\$1');
}

module.exports = escapeMarkdownV2;