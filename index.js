const fs = require('fs');
const json2xls = require('json2xls');

require("./config/database").connect();

const db = require('./config/database');
const collection = db.getDb().collection('clients');

async function getAllUsers() {
    try {
      const users = await collection.aggregate([{$limit: 7000}])
    //   const users = await collection.find()
      return (await users.toArray())
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  getAllUsers()
  .then((users) => {
    console.log('All users have been received from data base!')
    writeToExcel(users)
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  function writeToExcel(data) {
    const xls = json2xls(data);

    fs.writeFile("output.xlsx", xls, 'binary', (error) => {
        if (error) {
          console.error('Error writing file:', error);
        } else {
          console.log('File written successfully.');
        }
    });
  }