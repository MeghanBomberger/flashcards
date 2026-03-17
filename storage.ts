import { Platform } from 'react-native';
import Dexie from 'dexie';

// SQLite setup (mobile)
let db: any = null;
if (Platform.OS !== 'web') {
  const SQLite = require('expo-sqlite');
  db = SQLite.openDatabase('items.db');
}

// Dexie setup (web)
let dexieDb: any = null;
if (Platform.OS === 'web') {
  dexieDb = new Dexie('items');
  dexieDb.version(1).stores({
    items: '++id,done,value',
  });
}

export const Storage = {
  async addItem(item: { value: string; done: boolean }) {
    if (Platform.OS === 'web') {
      await dexieDb.items.add(item);
    } else {
      return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            'INSERT INTO items (done, value) VALUES (?, ?)',
            [item.done ? 1 : 0, item.value],
            (_, result) => resolve(result),
            (_, error) => reject(error)
          );
        });
      });
    }
  },

  async getItems() {
    if (Platform.OS === 'web') {
      return await dexieDb.items.toArray();
    } else {
      return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            'SELECT * FROM items',
            [],
            (_, { rows }) => resolve(rows._array),
            (_, error) => reject(error)
          );
        });
      });
    }
  },

  async updateItemAsDone(id: number) {
    if (Platform.OS === 'web') {
      await dexieDb.items.update(id, { done: true });
    } else {
      return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            'UPDATE items SET done = ? WHERE id = ?',
            [1, id],
            (_, result) => resolve(result),
            (_, error) => reject(error)
          );
        });
      });
    }
  },

  async deleteItem(id: number) {
    if (Platform.OS === 'web') {
      await dexieDb.items.delete(id);
    } else {
      return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            'DELETE FROM items WHERE id = ?',
            [id],
            (_, result) => resolve(result),
            (_, error) => reject(error)
          );
        });
      });
    }
  },
};
