// requirements
const express = require("express");
const fs = require('fs');
const path = require(`path`);

const app = express();
const port = "9000";

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

app.get('/api/v1/users', (request, response, next) => {
    console.log("Request recieved for /api/v1/users endpoint.");
    const users = [
        {
            name : "John",
            surname : "Doe"
        }
    ];

    response.send(JSON.stringify(users));
});

app.use('/pub', express.static(`${__dirname}/../frontend/public`)); // statikus mappa kiszolgálás, mert így nem kell egyesével sendfile-olni

const ipAddress = `http://127.0.0.2:${port}`;
app.listen(port, () => { 
    console.log(ipAddress); 
});




