// requirements
const express = require("express");
const fs = require('fs');
const path = require(`path`);

const app = express();
const port = "9001";

app.get('/', (request, response, next) => { // ez a sima 
    // console.log("Request recieved.");
    // response.send("Thank you for your request! This is our response.");
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`)); // az index.html-t azt külön szervezzük, ez csak best practice
});

app.get('/kismacska', (request, response, next) => { 
    response.sendFile(path.join(`${__dirname}/../frontend/somefile.json`)); 
});

app.get('/something', (request, response, next) => {
    console.log("Request recieved for something endpoint.");
    response.send("Thank you for your request! This is our response for something endpoint.");
});

const userFile = path.join(`${__dirname}/../frontend/users.json`);

app.get('/api/v1/users', (request, response, next) => {
    console.log("Request recieved for /api/v1/users endpoint.");
    response.sendFile(path.join(`${__dirname}/../frontend/users.json`)); 
    // const users = [
    //     {
    //         name : "John",
    //         surname : "Doe",
    //         status: "active",
    //     },
    //     {
    //         name : "Jane",
    //         surname : "Scatch",
    //         status : "passive",
    //     }
    // ];

    // response.send(JSON.stringify(users));
});

const getUsersByStatus = (userStatus) => {
    app.get(`/api/v1/users/${userStatus}`, (request, response, next) => {
        fs.readFile(userFile, (error, data) =>{
            if(error){
                response.send("Error just happened during opening the file.")
            } else {
                const users = JSON.parse(data);
                const activeUsers = users.filter( user => user.status === userStatus);
                response.send(activeUsers);
            }
        });
    });
}

getUsersByStatus("active");
getUsersByStatus("passive");

app.use('/pub', express.static(`${__dirname}/../frontend/public`)); // statikus mappa kiszolgálás, mert így nem kell egyesével sendfile-olni

const ipAddress = `http://127.0.0.2:${port}`;
app.listen(port, () => { 
    console.log(ipAddress); 
});