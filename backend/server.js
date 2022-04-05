// requirements
const { query } = require("express");
const express = require("express");
const fs = require('fs');
const path = require(`path`);

const app = express();
const port = "9001";

const userFile = path.join(`${__dirname}/../frontend/users.json`);
const frontendFolder = `${__dirname}/../frontend/public`;

app.use(express.json());
app.use('/pub', express.static(frontendFolder));

app.get('/', (request, response, next) => { // ez a sima 
    console.log("Request recieved.");
    // response.send("Thank you for your request! This is our response.");
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`)); // az index.html-t azt külön szervezzük, ez csak best practice
});

app.get('/admin/order-view', (request, response, next) => { // ez a sima 
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get('/api/v1/users', (request, response) => {
    response.sendFile(userFile);
});

app.get("/api/v1/users-query", (request, response) => { // query stringek a web technológia alap része
    console.dir(request.query);
    console.log(request.query.apiKey);
    if (request.query.apiKey === "apple") {
        response.sendFile(`${frontend}/users.json`);
    } else {
        response.send("Unauthorized request");
    }
})

app.get('/api/v1/user-params/:key', (request, response, next) => { // ez nem az lap web technológiában van benne, ez az express middleware csinálja
    console.log(request.params);
    console.log(request.params.key);
    
    if(request.params.key === "alma"){
        response.send("alma");
    } else {
        response.send("hello");
    }
    
});

const userStatuses = ["active", "passive"];

// app.get(`/api/v1/users/:key`, (request, response, next) => {
app.get(`/api/v1/users_data/:key`, (request, response, next) => {
    const userStatus = request.params.key;
    console.log(userStatus);

    // if(userStatus === undefined){
    //     response.sendFile(userFile);
    // } else { 
        if( !userStatuses.includes(userStatus) ){
            response.statusCode = 404;
            response.send("Please add valid status in url.");
        } else{ 
            fs.readFile(userFile, (error, data) =>{
                if(error){
                    response.statusCode = 404;
                    response.send("Error just happened during opening the file.");
                } else {
                    const users = JSON.parse(data);
                    const usersOfStatus = users.filter( user => user.status === userStatus);
                    response.send(usersOfStatus);
                }
            });
        }
    // }
});

// 
app.post('/users/new', (reqest, response) => {
        fs.readFile(userFile, (error, data) =>{
            if(error){
                response.statusCode = 404;
                response.send("Error just happened during opening the file.");
            } else {
                const users = JSON.parse(data);
                console.log(reqest.body);
            }
    })
	
});

const ipAddress = `http://127.0.0.2:${port}`;
app.listen(port, () => { 
    console.log(ipAddress); 
});