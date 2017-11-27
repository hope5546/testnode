var express = require('express');
var mysql = require('mysql');
var bodyPaser = require('body-parser');

var app = express();
var urlencodeParser = bodyPaser.urlencoded({extended:false});
var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "banking"
});

app.get('/',function(req,res){
	res.send('Hello world');
});

app.get('/testAccount',function(req,res){
	var sql = "SELECT * FROM account";
	con.query(sql,function(err,result){
		var tmp = JSON.stringify(result);
		res.send(tmp);
	});
});

app.post('/testAccount',urlencodeParser,function(req,res){
	var sql = "INSERT INTO account (account_number , branch_name , balance) VALUE('"+
	req.body.account_number+"','"+req.body.branch_name+"','"+req.body.balance+"')";
	res.send(sql);
	con.query(sql,function(err){
		if(err){
			console.log("CANNOT INSERT");
		}else{
			console.log("1 row inserted");
		}
	});
});

app.put('/testBalance',urlencodeParser,function(req,res){
	var sql = "UPDATE account SET balance ='"+req.body.balance+"' WHERE account_number = '"+req.body.account_number+"'";
	con.query(sql,function(err){
		if(err){
			console.log("CANNOT UPDATE");
		}else{
			console.log("UPDATE SUCCESS");
		}
	});
});

app.delete('/testDelete',urlencodeParser,function(req,res){
	var sql = "DELETE FROM account WHERE account_number = '"+req.body.account_number+"'";
	con.query(sql,function(err){
		if(err){
			console.log("CANNOT DELETE");
		}else{
			console.log("DELETE SUCCESS");
		}
	})
})


app.listen(3000,function(){
	console.log('port 3000');
})