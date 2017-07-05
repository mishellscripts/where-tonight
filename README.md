# wheretonight


## Overview

'wheretonight' is a nightlife coordination application created as a part of the [FreeCodeCamp](https://www.freecodecamp.com/) backend certification curriculum.
Users can look up bars around their location and verify where they are headed for the night to share and keep a history for future references. 
This application requires the Yelp Fusion API, ExpressJS web framework, MongoDB, Express, Pug, and Node.js. [Clementine](http://www.clementinejs.com/), a Javascript boilerplate, was used for quicker implementation. 
Github authentication is used for security and login purposes and is accomplished by using [Passport](http://passportjs.org/). 

### User Stories
1) As an unauthenticated user, I can view all bars in my area.
2) As an authenticated user, I can add myself to a bar to indicate I am going there tonight.
3) As an authenticated user, I can remove myself from a bar if I no longer want to go there.
4) As an unauthenticated user, when I login I should not have to search again.

Demo: Heroku deployment coming soon.


## Quick Start Guide

If the demo link is not working and you would like to view the application, follow these steps. If you have everything in the next section installed, skip ahead to Installation & Startup. 

### Prerequisites

You will need the following installed in order to proceed.

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Git](https://git-scm.com/)

### Installation & Startup

Go to your preferred directory and enter the below in the terminal window:

```bash
$ git clone https://github.com/mishellscripts/pollable.git
```

Next, install the dependencies:

```
$ cd your-project
$ npm install
```


### Setup GitHub Authentication

Please follow [this guide](http://www.clementinejs.com/tutorials/tutorial-passport.html#GitHubAppSetup) to register the application with GitHub and get API keys / secrets.

### Setup MongoDB

Coming soon. For now, I highly recommend using [mLab](https://mlab.com/) to host your MongoDB. It's free for 500MB and enough for your testing purposes.

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
GITHUB_KEY=your-client-id-here
GITHUB_SECRET=your-client-secret-here
MONGO_URI=your-monogdb-uri-here
PORT=8080
APP_URL=http://localhost:8080/
```

### Ready to Go

Ensure that you have connection to your MongoDB database. Connect to your database by typing the following in the terminal:

```bash
$ ./mongod
```

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server.

You should the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!
