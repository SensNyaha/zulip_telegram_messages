function formatTimeLocalized(date = new Date()) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(date);
}

module.exports = formatTimeLocalized;