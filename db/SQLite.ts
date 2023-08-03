import * as SQLite from 'expo-sqlite';

export type CyclicSession = {
  session_id: number;
  no_of_breaths_in_session: 30 | 35;
  no_of_rounds_in_session: 1 | 2 | 3 | 4 | 5;
  created_at: string;
};

export type BoxSession = {
  session_id: number;
  created_at: string;
  duration: number;
};

export type CyclicHistory = {
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

export type CyclicSessionHistory = {
  round_number: 1 | 2 | 3 | 4 | 5;
  hold_time: number;
  session_id: number;
  created_at: string;
};

const databaseName = 'app.db';

export const db: any = SQLite.openDatabase(databaseName);

// Function to create tables and initialize settings
export const createTables = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // db.transaction((tx: SQLite.SQLTransaction) => {
    //   tx.executeSql(`DROP TABLE IF EXISTS settings;`);
    //   tx.executeSql(`DROP TABLE IF EXISTS cyclic_history;`);
    //   tx.executeSql(`DROP TABLE IF EXISTS cyclic_sessions;`);
    //   tx.executeSql(`DROP TABLE IF EXISTS box_sessions;`);
    // });

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
          `CREATE TABLE IF NOT EXISTS cyclic_history (
            id INTEGER PRIMARY KEY NOT NULL,
            session_id INTEGER,
            round_number INTEGER,
            hold_time INTEGER,
            FOREIGN KEY(session_id) REFERENCES cyclic_sessions(session_id)
            );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS cyclic_sessions (
            session_id INTEGER PRIMARY KEY NOT NULL,
            no_of_breaths_in_session INTEGER,
            no_of_rounds_in_session INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS box_sessions (
            session_id INTEGER PRIMARY KEY NOT NULL,
           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
           duration INTEGER NOT NULL
          );`
        );
        resolve();
      },
      (error: Error) => {
        console.error(`Error occurred while creating tables: ${error}`);
        reject(error.message);
      }
    );
  });
};

//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS
//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS
//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS//SETTINGS
class SettingsDAO {
  public async getSettings(): Promise<Settings> {
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

  public async updateSettings(
    theme: 'light' | 'dark',
    noOfBreaths: 30 | 35,
    noOfRounds: 1 | 2 | 3 | 4 | 5
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `UPDATE settings SET theme = ?, no_of_breaths = ?, no_of_rounds = ? WHERE id = 1;`,
            [theme, noOfBreaths, noOfRounds]
          );
          resolve();
        },
        (error: Error) => {
          console.error(`Error occurred while updating settings: ${error}`);
          reject();
        }
      );
    });
  }
}

//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS
//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS
//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS//CYCLIC--SESSIONS
class CyclicSessionsDAO {
  public async getAllSessions(): Promise<CyclicSession[]> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(`SELECT * FROM cyclic_sessions;`, [], (_, { rows: { _array } }) =>
            resolve(_array)
          );
        },
        (error: Error) => {
          console.error(`Error occurred while reading settings: ${error}`);
          reject(error);
        }
      );
    });
  }

  public async createCyclicSession(
    noOfBreaths: 30 | 35,
    noOfRounds: 1 | 2 | 3 | 4 | 5
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `INSERT INTO cyclic_sessions (no_of_breaths_in_session, no_of_rounds_in_session) VALUES (?, ?);`,
            [noOfBreaths, noOfRounds],
            (_, resultSet) => resolve(resultSet.insertId!)
          );
        },
        (error: Error) => {
          console.error(`Error occurred while creating session: ${error}`);
          reject(error);
        }
      );
    });
  }

  public clearAllCyclicSessions() {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM sessions;`);
      },
      (error: Error) => {
        console.error(`Error occurred while clearing sessions: ${error}`);
      }
    );
  }

  public async deleteCyclicSession(sessionId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          // Delete cyclic history records associated with the session
          tx.executeSql(`DELETE FROM cyclic_history WHERE session_id = ?;`, [sessionId], () => {
            // Delete the cyclic session record
            tx.executeSql(`DELETE FROM cyclic_sessions WHERE session_id = ?;`, [sessionId]);
          });
          resolve();
        },
        (error: Error) => {
          console.error(`Error occurred while deleting cyclic session: ${error}`);
          reject(error);
        }
      );
    });
  }
}

//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//
//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//
//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//CYCLIC--HISTORY//
class CyclicSessionHistoryDAO {
  public async getAllCyclicHistory(): Promise<CyclicSessionHistory[]> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `SELECT
              cyclic_history.round_number,
              cyclic_history.hold_time,
              cyclic_sessions.created_at,
              cyclic_sessions.session_id
            FROM cyclic_history
            JOIN cyclic_sessions
              ON cyclic_history.session_id = cyclic_sessions.session_id
              ORDER BY cyclic_sessions.created_at DESC;`,
            [],
            (_, { rows: { _array } }) => resolve(_array)
          );
        },
        (error: Error) => {
          console.error(`Error occurred while getting all session history: ${error}`);
          reject(error);
        }
      );
    });
  }

  public async getOneCyclicSessionHistory(sessionId: number): Promise<CyclicHistory[]> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `SELECT * FROM cyclic_history WHERE session_id = ?;`,
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

  public async createCyclicHistory(
    sessionId: number,
    roundNumber: 1 | 2 | 3 | 4 | 5,
    holdTime: number
  ) {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        // Check if a row with the same session_id and round_number already exists
        tx.executeSql(
          `SELECT * FROM cyclic_history WHERE session_id = ? AND round_number = ?;`,
          [sessionId, roundNumber],
          (_, { rows: { _array } }) => {
            if (_array.length > 0) {
              // Row with the same combination already exists, you can choose to update it or do nothing
              // Here, I'm just logging a message, but you can handle the update logic as per your requirements
              console.log('Row with the same combination already exists. Skipping insertion.');
            } else {
              // Row with the same combination does not exist, insert a new row
              tx.executeSql(
                `INSERT INTO cyclic_history (session_id, round_number, hold_time) VALUES (?, ?, ?);`,
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

  public async clearAllCyclicHistory() {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM history;`);
      },
      (error: Error) => {
        console.error(`Error occurred while clearing session history: ${error}`);
      }
    );
  }

  public async getAverageCyclicHoldTime(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT AVG(hold_time) AS average_hold_time FROM cyclic_history;`,
          [],
          (_, { rows }) => {
            const averageHoldTime = rows.length > 0 ? rows._array[0].average_hold_time : null;
            resolve(averageHoldTime);
          }
        ),
          (error: Error) => {
            console.error(`Error occurred while getting the average hold time: ${error}`);
            reject(error);
          };
      });
    });
  }

  public async getMaxCyclicHoldTime(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT MAX(hold_time) AS max_hold_time FROM cyclic_history;`,
          [],
          (_, { rows }) => {
            const maxHoldTime = rows.length > 0 ? rows._array[0].max_hold_time : null;
            resolve(maxHoldTime);
          }
        ),
          (error: Error) => {
            console.error(`Error occurred while getting the average hold time: ${error}`);
            reject(error);
          };
      });
    });
  }
}

//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//
//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//
//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//BOX--HISTORY//
class BoxSessionHistoryDAO {
  public async getAllCBoxHistory(): Promise<BoxSession[]> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `SELECT * FROM box_sessions ORDER BY created_at DESC;`,
            [],
            (_, { rows: { _array } }) => resolve(_array)
          );
        },
        (error: Error) => {
          console.error(`Error occurred while getting all session history: ${error}`);
          reject(error);
        }
      );
    });
  }

  public async createBoxSession(duration: number): Promise<number> {
    return new Promise((resolve, reject) => {
      if (duration > 0) {
        db.transaction(
          (tx: SQLite.SQLTransaction) => {
            tx.executeSql(
              `INSERT INTO box_sessions (duration) VALUES (?);`,
              [duration],
              (_, resultSet) => resolve(resultSet.insertId!)
            );
          },
          (error: Error) => {
            console.error(`Error occurred while creating a new box session: ${error}`);
            reject(error);
          }
        );
      } else {
        resolve(0);
      }
    });
  }

  public async getAverageBoxHoldTime(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT AVG(duration) AS average_duration FROM box_sessions;`,
          [],
          (_, { rows }) => {
            const maxSessionTime = rows.length > 0 ? rows._array[0].average_duration : null;
            resolve(maxSessionTime);
          }
        ),
          (error: Error) => {
            console.error(`Error occurred while getting the average hold time: ${error}`);
            reject(error);
          };
      });
    });
  }

  public async getMaxBoxHoldTime(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT MAX(duration) AS max_duration FROM box_sessions;`,
          [],
          (_, { rows }) => {
            const maxSessionTime = rows.length > 0 ? rows._array[0].max_duration : null;
            resolve(maxSessionTime);
          }
        ),
          (error: Error) => {
            console.error(`Error occurred while getting the average hold time: ${error}`);
            reject(error);
          };
      });
    });
  }

  public async deleteBoxSession(sessionId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          // Delete cyclic history records associated with the session
          tx.executeSql(`DELETE FROM box_sessions WHERE session_id = ?;`, [sessionId]);
          resolve();
        },
        (error: Error) => {
          console.error(`Error occurred while deleting cyclic session: ${error}`);
          reject(error);
        }
      );
    });
  }
}
export { SettingsDAO, CyclicSessionsDAO, CyclicSessionHistoryDAO, BoxSessionHistoryDAO };
