# async tic tac toe

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
2. Faced the problem related to implement X for both players and O for its opponents

# Links

Frontend: https://async-tic-tac-toe-ritesh.netlify.app/

Backend: https://tic-tac-toe-jmkd.onrender.com
