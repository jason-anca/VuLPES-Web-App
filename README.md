# VuLPES-Web-App
VuLPES is my final year project in SETU and the idea behind this project is to create a low-cost platform and infrastructure where course materials can be uploaded by educators and viewed by students in a learning environment. This infrastructure is to be composed of a JavaScript Application that's backed by a database and has hardware components like a Raspberry Pi to host the Web App and an additional Raspberry Pi to act as a content manager. The secondary Pi in this case would act like a router so that students can be connected to the internet, but viewable content is managed through a firewall.

Progress is currently being tracked through the use of Trello. The board can be found [here.]([url](https://trello.com/b/Qr1hJJA0/vulpes)https://trello.com/b/Qr1hJJA0/vulpes)

# Getting Started
## How to run the app in this version:
- Use the command: "node app.js"
- Fill in the prompts asked in the command line.

# TO DO
- ~~Get started on the Web Application by creating a simple CLI GUI~~
- ~~Allow the app to communicate with DynamoDB~~
- ~~Allow the ability to push table entries into DynamoDB~~
- Once entities can be pushed into the table, write code to salt and hash passwords, which will then be pushed to DynamoDB
- Finish CRUD capabilties
    - ~~Create~~
    - ~~Read~~
    - Update
    - Delete

# Current Features
- Ability to push items to DynamoDB table.
- Validation checking if partition key and sort key already exist in the database. Prevents duplicates.
- Read entries from Database.