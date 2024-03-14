// src/app.js

const express = require('express');
const app = express();
const port = 5000;

const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const indexRouter = require('./src/routes/index');
const resetControlLevel = require('./src/utils/resetControlLevel');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);