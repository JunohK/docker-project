const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;

const app = express();

var db;
var databaseUrl = 'mongodb+srv://admin:1234@cluster0.yjkyibk.mongodb.net/?retryWrites=true&w=majority';

app.get('/', (req,res) => {
	res.sendFile(__dirname + "/views/index.html");
});
app.get('/project', (req,res) => {
	console.log(mongoClient);
	mongoClient.connect(databaseUrl, function(err, database){
		if(err){
			console.error(err);
			console.log("connection error");
			res.json("connection error");
		} else {
			db = database.db('test');
			db.collection("project").find({},{id:0, name:1, age:1, sex:1}).toArray(function(err, result){
				if(err) throw err;
				console.log('결과 : ', result);
				var usertable = 
				`
				<table border="1" text-alian:center;>
				<tr>
					<th> 이름 </th>
					<th> 나이 </th>
					<th> 성별 </th>
				</tr>
				`;

				result.forEach((item) => {
					usertable += `
					<tr>
						<th>${item.name}</th>
						<th>${item.age}</th>
						<th>${item.sex}</th>
					</tr>
					`;
				})
				usertable+=`</table>`;
				res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
				res.end(usertable);
			});
		}
	})
});

module.exports = app;
