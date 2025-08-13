**Custom Twitter Clone**

**Custom Twitter Clone** is a side project I developed using the **MERN stack — MongoDB, Express.js, React.js, and Node.js**. The project was initially inspired by Twitter’s style and core functionalities but has evolved with many additional, custom features beyond Twitter’s scope. It was also created as a guide to help a group of students learn full-stack web development.

**Features**

The app combines frontend and backend functionalities with the following features:

User authentication: **Login and Registration**

Tweets: **Create, read, update, delete, search, sort, and like**

Users can **edit, delete, and like only their own tweets;** other users’ tweets are protected

**Admin privileges:** modify all tweets and delete users

Social features: **Follow, unfollow, and shuffle users**

**Dark and light mode toggle**

**Live chat** between users via **WebSockets**

**Background music:** play and stop at will

**LocalStorage** for auth tokens; all other data stored in the database

Ready to be deployed on **AWS** or **Microsoft Azure**

## 🛠 Installation Instructions

Clone the repo and install dependencies for both **Frontend** and **Backend**:

```bash
# Backend: install dependencies, seed the database, and start the server
cd Backend
npm install
node seed.js
npm start

# Frontend: install dependencies and start the app
cd Frontend
npm install --legacy-peer-deps
npm start
```
