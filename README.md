# VuLPES-Web-App
VuLPES is my final year project in SETU and the idea behind this project is to create a low-cost platform and infrastructure where course materials can be uploaded by educators and viewed by students in a learning environment. This infrastructure is to be composed of a JavaScript Application that's backed by a database and has hardware components like a Raspberry Pi to host the Web App to act as a content manager. The Raspberry Pi uses PiHole while hosting the Web App so that when users are connected to the Wi-Fi connection, certain domains are blocked from view.

# Getting Started
## How to run the app in this version:
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