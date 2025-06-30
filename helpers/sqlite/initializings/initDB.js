function initDB(db) {
  // Initialize database tables for storing user data
  db.prepare(
    `
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY,
            isFrozen INTEGER DEFAULT 0,
            notify_timeout_sec INTEGER DEFAULT 300
        )
    `
  ).run();

  db.prepare(
    `
        CREATE TABLE IF NOT EXISTS ZulipCredentials (
            user_id INTEGER PRIMARY KEY,
            api_key TEXT NOT NULL,
            username TEXT NOT NULL,
            realm TEXT NOT NULL,
            verified INTEGER,
            failed_attempts INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
        )
    `
  ).run();

  db.prepare(
    `
        CREATE TABLE IF NOT EXISTS FastReactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            value TEXT NOT NULL,
            text_value TEXT NOT NULL, 
            UNIQUE(type, value)
        )
    `
  ).run();

  db.prepare(
    `
        INSERT OR IGNORE INTO FastReactions(id, type, value, text_value) VALUES 
            (0, 'Read', '✔', 'done'),
            (1, 'Reply', 'OK', 'OK'), 
            (2, 'React', '👍', '+1'),
            (3, 'React', '👌', 'ok')
    `
  ).run();

  db.prepare(
    `
        CREATE TABLE IF NOT EXISTS UserFastReactions (
            user_id INTEGER PRIMARY KEY,
            reaction_1 INTEGER DEFAULT 0,
            reaction_2 INTEGER DEFAULT 1,
            reaction_3 INTEGER DEFAULT 2,
            reaction_4 INTEGER DEFAULT 3,
            FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
            FOREIGN KEY (reaction_1) REFERENCES FastReactions (id),
            FOREIGN KEY (reaction_2) REFERENCES FastReactions (id),
            FOREIGN KEY (reaction_3) REFERENCES FastReactions (id),
            FOREIGN KEY (reaction_4) REFERENCES FastReactions (id)
        )
    `
  ).run();

  db.prepare(
    `
        CREATE TABLE IF NOT EXISTS NotifiedMessages (
            user_id INTEGER,
            zulip_message_id INTEGER,
            telegram_notify_id INTEGER,
            UNIQUE (user_id, zulip_message_id, telegram_notify_id),
            FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
        );
    `
  ).run();

  db.prepare(
    `
        CREATE TABLE IF NOT EXISTS Langs (
            user_id INTEGER PRIMARY KEY,
            lang TEXT DEFAULT eng
        )
    `
  ).run();

  db.prepare(`
        CREATE TABLE IF NOT EXISTS FiringNotificationsStatus (
            user_id INTEGER,
            notifyStatus INTEGER DEFAULT 1,
            UNIQUE (user_id),
            FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
        )
    `).run();

  db.prepare(`
      CREATE TABLE IF NOT EXISTS FiredEmployees (
            user_id INTEGER,
            fullname TEXT,
            firedDate TEXT,
            UNIQUE (user_id)
        )
    `).run();
}

module.exports = initDB;
