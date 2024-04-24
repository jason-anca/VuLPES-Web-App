# VuLPES-Web-App
VuLPES is my final year project in SETU and the idea behind this project is to create a low-cost platform and infrastructure where course materials can be uploaded by educators and viewed by students in a learning environment. This infrastructure is to be composed of a JavaScript Application that's backed by a database and has hardware components like a Raspberry Pi to host the Web App to act as a content manager. The Raspberry Pi uses PiHole while hosting the Web App so that when users are connected to the Wi-Fi connection, certain domains are blocked from view.

# Getting Started
## How to run the app:
- Node.js is required to use the web-app
- Npm is required to use the web-app
- Install required node packages. This list can be found at the end of the read me.
- Use the command: "npm start"


# Current Features
## Database
- Data is currently stored in localStorage since I wrecked my head trying to handle Authentication properly so now I'm handling it on the severside on the web app rather than through the cloud, which is how I wanted to do it.

## Web App
- Home Page with list of Teachers which can be filtered with a filter box by typing.
- Ability to click a Teacher's Card to then navigate to their Subject Page. The page contains a dropdown menu which allows you to view subjects taught by the teacher which is filtered by "class".
- Clicking on a subject will allow you to view the subject page where a teacher may post content related to their subject. Posts can embed YouTube links for ease of viewing. Posts are displayed in order of post date descending so that new posts are always on top but can be dragged and dropped. This allows the reorganization of posts if one deems it necessary. Posts are also being stored in LocalStorage.
- Drap and drop features are disabled for non-teachers or admins. Post creation is also hidden from view when not logged in. This is to prevent students to create posts and move posts around.
- An admin panel and admin accounts have been created to allow the creation of new admin accounts and teachers, which are also user and have the ability to login once created. Admins can also delete existing teachers.
- The admin panel has "toast" features where a toast pops up for any informational prompts. 
- Login and Logout feature is also in place.

## Raspberry Pi
- Currently a Raspberry Pi is using PiHole to filter out domains on the network. This is to act as the content manager for people on the network.
- Additionally, the Web App has the ability to be hosted on the Raspberry Pi so that users on the network can also view the Web App but is not publically accessable.

## NPM Packages
This is a list of NPM packages that I have used during development. Some packages have endded up redudantant due to missing some core features but are required if the project is updated in the future to use proper authentication using DynamoDB and etc.
</br>
npm install @aws-amplify/auth
npm install @aws-amplify/ui-react
npm install @emotion/react
npm install @fortawesome/fontawesome-free
npm install @testing-library/jest-dom
npm install @testing-library/react
npm install @testing-library/user-event
npm install amazon-cognito-identity-js
npm install aws-amplify
npm install aws-sdk
npm install axios
npm install bcryptjs
npm install crypto-browserify
npm install dompurify
npm install path
npm install react
npm install react-beautiful-dnd
npm install react-dom
npm install react-quill
npm install react-router-dom
npm install react-scripts
npm install react-toastify
npm install stream
npm install theme-ui
npm install web-vitals

The installation process can be streamlined using the following command with node and npm installed:
`npm install @aws-amplify/auth; npm install @aws-amplify/ui-react; npm install @emotion/react; npm install @fortawesome/fontawesome-free; npm install @testing-library/jest-dom; npm install @testing-library/react; npm install @testing-library/user-event; npm install amazon-cognito-identity-js; npm install aws-amplify; npm install aws-sdk; npm install axios; npm install bcryptjs; npm install crypto-browserify; npm install dompurify; npm install path; npm install react; npm install react-beautiful-dnd; npm install react-dom;npm install react-quill; npm install react-router-dom; npm install react-scripts; npm install react-toastify; npm install stream; npm install theme-ui; npm install web-vitals;`