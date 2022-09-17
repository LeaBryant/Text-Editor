import { openDB } from 'idb';

// this will create a DB if it does not exsit 
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log ('PUT to database');
  // Opens the db connection
const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  // This opens up desired object store
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => 
{ console.log('GET the Database');

// Create a connection to the database database and version we want to use.
const jateDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
const tx = jateDb.transaction('jate', 'readonly');

// Open up the desired object store.
const store = tx.objectStore('jate');

// Use the .getAll() method to get all data in the database. Instead of getll()
const request = store.get(1);

// Get confirmation of the request and then checks if the variable is defined and if it is, return it. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). changed result.content to result.vaule

const result = await request;
result
  ? console.log('DATA is connected to db', result.value)
  : console.log ('DATA not connecting to db');
return result?.value;
};

initdb();
