import * as SQLite from 'expo-sqlite';

export type Session = {
  session_id: number;
  no_of_breaths_in_session: 30 | 35;
  no_of_rounds_in_session: 1 | 2 | 3 | 4 | 5;
  created_at: string;
};

export type History = {
  id: number;
  session_id: number;
  round_number: 1 | 2 | 3 | 4 | 5;
  hold_time: number;
};

export type Settings = {
  theme: 'light' | 'dark';
  no_of_breaths: 30 | 35;
  no_of_rounds: 1 | 2 | 3 | 4 | 5;
};

export type SessionHistory = Pick<History, 'round_number' | 'hold_time'>;

const databaseName = 'app.db';

const db: any = SQLite.openDatabase(databaseName);

// Function to create tables and initialize settings
export const createTables = () => {
  db.transaction(
    (tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY NOT NULL,
          theme TEXT,
          no_of_breaths INTEGER,
          no_of_rounds INTEGER
        );`
      );

      // Check if settings table is empty
      tx.executeSql(`SELECT COUNT(id) as count FROM settings;`, [], (_, { rows: { _array } }) => {
        // If the settings table is empty, insert default settings
        if (_array[0].count === 0) {
          tx.executeSql(
            `INSERT INTO settings (id, theme, no_of_breaths, no_of_rounds) 
               VALUES (1, 'light', 30, 3);`
          );
        }
      });

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS history (
          id INTEGER PRIMARY KEY NOT NULL,
          session_id INTEGER,
          round_number INTEGER,
          hold_time INTEGER,
          FOREIGN KEY(session_id) REFERENCES sessions(session_id)
        );`
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS sessions (
          session_id INTEGER PRIMARY KEY NOT NULL,
          no_of_breaths_in_session INTEGER,
          no_of_rounds_in_session INTEGER,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      );
    },
    (error: Error) => {
      console.error(`Error occurred while creating tables: ${error}`);
    }
  );
};

//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS
//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS
//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS
class SettingsDAO {
  public getSettings(): Promise<Settings> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(`SELECT * FROM settings WHERE id = 1;`, [], (_, { rows: { _array } }) =>
            resolve(_array[0])
          );
        },
        (error: Error) => {
          console.error(`Error occurred while reading settings: ${error}`);
          reject(error);
        }
      );
    });
  }

  public updateSettings(
    theme: 'light' | 'dark',
    noOfBreaths: 30 | 35,
    noOfRounds: 1 | 2 | 3 | 4 | 5
  ) {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `UPDATE settings SET theme = ?, no_of_breaths = ?, no_of_rounds = ? WHERE id = 1;`,
          [theme, noOfBreaths, noOfRounds]
        );
      },
      (error: Error) => {
        console.error(`Error occurred while updating settings: ${error}`);
      }
    );
  }
}

//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS
//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS
//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS//SESSIONS
class SessionsDAO {
  public getOneSession(sessionId: number, callback: (session: Session) => void) {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT * FROM sessions WHERE session_id = ?;`,
          [sessionId],
          (_, { rows: { _array } }) => callback(_array[0])
        );
      },
      (error: Error) => {
        console.error(`Error occurred while getting session: ${error}`);
      }
    );
  }

  public getAllSessions(): Promise<Record<number, Omit<Session, 'session_id'>[]>> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `SELECT * FROM sessions ORDER BY created_at DESC;`,
            [],
            (_, { rows: { _array } }) => {
              // Create an empty object to store the sorted data
              const sortedData: Record<number, Omit<Session, 'session_id'>[]> = {};

              // Loop through the result rows and organize them by session_id
              _array.forEach((row: Session) => {
                const { session_id, ...rest } = row;
                if (!sortedData[session_id]) {
                  sortedData[session_id] = [rest];
                } else {
                  sortedData[session_id].push(rest);
                }
              });

              // Pass the sorted data to the callback function
              resolve(sortedData);
            }
          );
        },
        (error: Error) => {
          console.error(`Error occurred while getting all sessions: ${error}`);
          reject(error);
        }
      );
    });
  }

  public createSession(noOfBreaths: 30 | 35, noOfRounds: 1 | 2 | 3 | 4 | 5): Promise<number> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `INSERT INTO sessions (no_of_breaths_in_session, no_of_rounds_in_session) VALUES (?, ?);`,
            [noOfBreaths, noOfRounds],
            (_, resultSet) => resolve(resultSet.insertId!)
          );
        },
        (error: Error) => {
          console.error(`Error occurred while creating session: ${error}`);
        }
      );
    });
  }

  public clearAllSessions() {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM sessions;`);
      },
      (error: Error) => {
        console.error(`Error occurred while clearing sessions: ${error}`);
      }
    );
  }
}

//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY
//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY
//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY//HISTORY
class SessionHistoryDAO {
  public getAllHistory(): Promise<{ [timestamp: string]: SessionHistory[] }> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `SELECT * FROM history JOIN sessions ON history.session_id = sessions.session_id ORDER BY sessions.created_at DESC;`,
            [],
            (_, { rows: { _array } }) => {
              const sessions: { [createdAt: string]: SessionHistory[] } = {};

              _array.forEach((row: History & Session) => {
                const { created_at, round_number, hold_time } = row;
                if (!sessions[created_at]) {
                  sessions[created_at] = [];
                }
                sessions[created_at].push({ round_number, hold_time });
              });

              resolve(sessions);
            }
          );
        },
        (error: Error) => {
          console.error(`Error occurred while getting all session history: ${error}`);
          reject(error);
        }
      );
    });
  }

  public async getOneSessionHistory(sessionId: number): Promise<History[]> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `SELECT * FROM history WHERE session_id = ?;`,
            [sessionId],
            (_, { rows: { _array } }) => resolve(_array)
          );
        },
        (error: Error) => {
          console.error(`Error occurred while getting session history: ${error}`);
          reject(error);
        }
      );
    });
  }

  public createHistory(sessionId: number, roundNumber: 1 | 2 | 3 | 4 | 5, holdTime: number) {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        // Check if a row with the same session_id and round_number already exists
        tx.executeSql(
          `SELECT * FROM history WHERE session_id = ? AND round_number = ?;`,
          [sessionId, roundNumber],
          (_, { rows: { _array } }) => {
            if (_array.length > 0) {
              // Row with the same combination already exists, you can choose to update it or do nothing
              // Here, I'm just logging a message, but you can handle the update logic as per your requirements
              console.log('Row with the same combination already exists. Skipping insertion.');
            } else {
              // Row with the same combination does not exist, insert a new row
              tx.executeSql(
                `INSERT INTO history (session_id, round_number, hold_time) VALUES (?, ?, ?);`,
                [sessionId, roundNumber, holdTime]
              );
            }
          }
        );
      },
      (error: Error) => {
        console.error(`Error occurred while creating session history: ${error}`);
      }
    );
  }

  public clearAllHistory() {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM history;`);
      },
      (error: Error) => {
        console.error(`Error occurred while clearing session history: ${error}`);
      }
    );
  }
}

export { SettingsDAO, SessionsDAO, SessionHistoryDAO };
