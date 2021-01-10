const express = require('express');
const app = express();
const userRouter = require("./api/routers/user.router");
const bodyParser = require('body-parser');
const db = require('./config/database');
db.collection;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/api/", userRouter);

app.listen(3000, () => {
    console.log('Server up and running');
})  

// hi