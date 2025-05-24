function deleteUser(db, userId) {
    let result = db.prepare(`
        DELETE FROM Users
        WHERE id = ?
    `).run(userId);
    return result.changes > 0
}

module.exports = deleteUser