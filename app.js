'use strict'
const express = require('express');

const PORT = 8000;
const HOST = '0.0.0.0';

const app = express();

var main = require('./routes/main.js');

app.use(express.static(__dirname + "/views"));
app.use('/',main);

/*
app.get('/',function (req,res) {
	res.sendFile(__dirname + '/views/index.html');
});
*/

app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);
