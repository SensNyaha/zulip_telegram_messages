function changeUserApiKey(db, userId, newApiKey) {
    let user = db.prepare(`
        SELECT zulip_credits FROM Users
        WHERE id = ?
    `).get(userId)

    let userZulipCredits = JSON.parse(user.zulip_credits);
    userZulipCredits.apiKey = newApiKey;

    let result = db.prepare(`
        UPDATE Users
        SET zulip_credits = ?
        WHERE id = ?
    `).run(JSON.stringify(userZulipCredits), userId);
    return result.changes > 0
}

module.exports = changeUserApiKey