require('dotenv').config();
const readLine = require('readline');
const AWS = require('aws-sdk');
const { exit, rawListeners } = require('process');
const { clearTerminal } = require('./utils')

AWS.config.update({
  region: process.env.AWS_REGION,          // e.g., us-east-1
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function getUserInput(prompt) {
    return new Promise(resolve => {
        readline.question(prompt, answer => { resolve(answer.trim());});
    });
}

async function itemExists(accountId, DoB) {
    const params = {
      TableName: 'VuLPES',
      Key: {
        AccountId: accountId,
        DoB: DoB
      },
    };
  
    try {
      const data = await dynamoDB.get(params).promise();
      return !!data.Item; // Return true if item exists, false otherwise
    } catch (error) {
      console.error('Error checking if item exists:', error);
      return false;
    }
  }

async function addItemToDb(){
    await delay(1000);
    const accountId = await getUserInput('Enter account ID: ');
    console.clear()
    const DoB = await getUserInput('Enter date of birth (yyyy-mm-dd): ');
    const entryExists = await itemExists(accountId, DoB);
    if(entryExists){
        console.log('Item with the same account ID and DoB already exists. Cannot add duplicate.');
        readline.close();
        process.exit();
    }
    console.clear()
    const nameDb = await getUserInput('Enter name of person: ');
    console.clear()
    const password = await getUserInput('Enter password: ');
    console.clear()
    const username = await getUserInput('Enter username: ');
    console.clear()

    const params = {
        TableName: 'VuLPES', 
        Item: {
          AccountId: accountId,
          DoB: DoB ,
          Name: nameDb,
          Password: password,
          Username: username
        },
      };
      
      dynamoDB.put(params, (err, data) => {
        if (err) {
          console.error('\nUnable to add item:', err);
        } else {
          console.log('\nItem added successfully:', data);
        }
        readline.close
        process.exit();
      });
}

async function listEntries() {
  const params = {
    TableName: 'VuLPES',
  }

  try {
    const data = await dynamoDB.scan(params).promise();

    if (data.Items.length === 0) {
      console.log('No entries found in the database.');
    } else {
      console.log('List of entries in the database: ');
      data.Items.forEach(item => {
        console.log(item);
      });
    }
  } catch (error) {
    console.error('Error listing entries:', error);
  }
}


async function displayMenu() {
  console.log('1. Add Item to Database');
  console.log('2. List all items in Database(non functional)');
  console.log('0. Quit');

  const userChoice = await getUserInput('\nEnter your choice: ')

  switch (userChoice) {
    case '1':
      await clearTerminal();
      await addItemToDb();
      break;
    case '2':
      await clearTerminal();
      await listEntries();
      break;
    case '0':
      console.log('Goodbye!');
      readLine.close();
      process.exit();
    default:
      console.log('Invalid Choice. Please select a valid option.');
      break;
  }
  await displayMenu();
}

displayMenu();