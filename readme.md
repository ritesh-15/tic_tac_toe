# async tic tac toe

## Introduction

Async tic tac toe is game which build on top of latest trending tech stack. It is a tic tac toe but with slight twist. Both the player need not be be online at same time they can play the game at their own convenience withoug worring about game progress.

## Installation Guide

1. First clone the repository
2. Run yarn on the frontend repository to install all the dependencies
3. Then run yarn dev to run application locally
4. Ther server is deployed at https://tic-tac-toe-jmkd.onrender.com

## Architecture

1. Uses MVC architecture in the backend with Node Js and Express
2. To main and scale the application i have used the MVC(Model View Controller) architecture in the backend
3. The frontend and backend is fully build on typescript to imporove the code quality and convienience
4. The frontend used the axios and react queyr to fetch the api data with inbuild caching
5. The backend has jwt authentication with secure token rotation system
6. Using rate limiter to avoid multiple requests at once and to avoide any attack
7. The tailwind css is used to style the appliction
8. The backend architecture is scalable to handle multiple users

## Problems faced

1. When the game is finished there are many socket events comes to the frontend due to which transaction issued is occuring the to the database due to which sometime may be game is not updated at the database even though it finisehd.
2. Faced the problem related to implement X for both players and O for there opponents

## Features

1. Login using username and password
2. Register with basic details
3. See all the games going on and games that played before with their result
4. Create a new game with anyone with just their email address
5. Play real time tic tac toe with the opponent

## Tech Stack

<div class="" style="display:flex;flex-wrap:wrap;">

<img style="width:100px;object-fit:contain" src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png">

<img style="width:100px;object-fit:contain;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png">
</div>

<img style="width:100px;object-fit:contain;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png">

<img style="width:100px;object-fit:contain;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png">

<img style="width:100px;object-fit:contain;" src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png">

<img style="width:100px;object-fit:contain;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png">

<img style="width:100px;object-fit:contain;" src="https://react-query-v3.tanstack.com/_next/static/images/emblem-light-628080660fddb35787ff6c77e97ca43e.svg">

<img style="width:100px;object-fit:contain;" src="https://cdn.freebiesupply.com/logos/large/2x/socket-io-logo-png-transparent.png">

</div>

## Screenshots

<div style="display:flex;flex-wrap:wrap;">
<img style="width:250px;object-fit:contain;" src="/assets/1.png">
<img style="width:250px;object-fit:contain;" src="/assets/2.png">
<img style="width:250px;object-fit:contain;" src="/assets/3.png">
<img style="width:250px;object-fit:contain;" src="/assets/4.png">
<img style="width:250px;object-fit:contain;" src="/assets/5.png">
<img style="width:250px;object-fit:contain;" src="/assets/6.png">
</div>

# Links

Frontend: https://async-tic-tac-toe-ritesh.netlify.app/

Backend: https://tic-tac-toe-jmkd.onrender.com

### Dont forgot to give a ⭐ to repository 😁
