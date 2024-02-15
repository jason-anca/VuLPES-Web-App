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
          DoB: DoB,
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

async function deleteEntry(accountId, DoB) {
  const params = {
    TableName: 'VuLPES',
    Key: {
      AccountId: accountId,
      DoB: DoB,
    },
  };

  try {
    const data = await dynamoDB.delete(params).promise();
    console.log('Entry deleted successfully:', data);
  } catch (error) {
    console.error('Error deleting entry:', error);
  }
}

async function updateEntry(accountId, DoB, updatedFields){
  const params = {
    TableName: 'VuLPES',
    Key: {
      AccountId: accountId,
      DoB: DoB,
    },
    UpdateExpression: 'SET #name = :name, #password = :password, #username = :username',
    ExpressionAttributeNames: {
      '#name': 'Name',
      '#password': 'Password',
      '#username': 'Username',
    },
    ExpressionAttributeValues: {
      ':name': updatedFields.Name,
      ':password': updatedFields.Password,
      ':username': updatedFields.Username,
    },
    ReturnValues: 'ALL_NEW', // Specifying the desired return values
  };

  try {
    const data = await dynamoDB.update(params).promise();
    console.log('Entry updated successfully:', data);

  } catch (error) {
    console.error('Error updating entry:', error);
  }
}

async function displayMenu() {
  console.log('1. Add Item to Database');
  console.log('2. List all items in Database');
  console.log('3. Delete entry in Database');
  console.log('4. Update entry in Database');
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

    case '3':
      await clearTerminal();
      await listEntries();
      const accountIdToDelete = await getUserInput('Enter AccountId to delete: ');
      const DoBToDelete = await getUserInput('Enter DoB to delete: ');
      await deleteEntry(accountIdToDelete, DoBToDelete);
      break;

    case '4':
      await clearTerminal();
      await listEntries();
      const accountIdToUpdate = await getUserInput('Enter AccountId to update: ');
      const DoBToUpdate = await getUserInput('Enter DoB to update: ');
      const updatedFields = {
        Name: await getUserInput('Enter updated name: '),
        Password: await getUserInput('Enter updated password: '),
        Username: await getUserInput('Enter updated username: '),
      };
      await updateEntry(accountIdToUpdate,DoBToUpdate,updatedFields);
      break;
    case '0':
      console.log('Goodbye!');
      process.exit();
    default:
      console.log('Invalid Choice. Please select a valid option.');
      break;
  }
  await displayMenu();
}

displayMenu();