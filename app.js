require('dotenv').config();
const readLine = require('readline');
const AWS = require('aws-sdk');
const { exit } = require('process');

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
        readline.question(prompt, answer => { resolve(answer);});
    });
}

async function addItemToDb(){
    await delay(1000);
    const accountId = await getUserInput('Enter account ID: ');
    console.clear()
    const doB = await getUserInput('Enter date of birth (yyyy-mm-dd): ');
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
          DoB: doB ,
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
        exit
      });

}

addItemToDb();


