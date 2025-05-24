function addNewUser(db, userId, zulipCreditsJSON) {
    let result = db.prepare(`
        INSERT INTO Users(id, zulip_credits)
        VALUES(?, ?)
    `).run(userId, zulipCreditsJSON);
    return result.changes > 0 
}

module.exports = addNewUser