
var express = require("express");
var	app = express();
var	server = require('http').createServer(app);
var	io = require('socket.io').listen(server);

var usernames = []; //array with user names


server.listen(8000);


io.sockets.on('connection', function(socket){ //receive data

	socket.on('connection', function(username){
								
				if(usernames.indexOf(username) == -1 && username != "" ){ //the username is unique				
					usernames.push(username); //add the new user name to the list
					io.emit('update usernames', usernames); //return a table with usernames
					io.emit('username problem',false, username); //everything it's ok
					console.log("login "+username);				
				}
				else{ //the username already exist
					io.emit('username problem',true, username); //there is a problem
					console.log("problem "+username);				
				}	
	});	
	


	socket.on('disconnect', function(){
			  //if(!socket.nickname){return;}
	   if(socket.nickname != "undefined"){ 
			  console.log(socket.nickname + " disconnected");			  
			  usernames.splice(usernames.indexOf(socket.nickname),1);	
			  io.emit('update usernames', usernames); //return a table with usernames	  
		}	  
  	});


	socket.on('exit', function(){ //δεν ξέρω αν δουλεύει
			  //if(!socket.nickname){return;}
	   if(socket.nickname != "undefined"){ 
			  console.log(socket.nickname + " exit");			  
			  usernames.splice(usernames.indexOf(socket.nickname),1);	
			  io.emit('update usernames', usernames); //return a table with usernames	  
		}	  
  	});

	
	socket.on('chat message', function(name, msg){
		if(name != null){ 
			socket.nickname = name;                    // περίεργο πράγμα
			io.emit('chat message',name ,  msg);
  		}
  	});
  	
  	
	socket.on('is typing' , function(username){ //send the name of the user that is typing 
			//console.log(username + "is typing");			
			io.emit('is typing' , username );
	});

	//test area
	socket.on('text page',function(text,name){
			io.emit('text page',text,name);
	});


});


app.get('/messenger', function(req , res){
	res.sendFile(__dirname + '/index.html');
	
	//var  ip = res.connection.remoteAddress;
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;	
	console.log("ip-> "+ ip );	
});

app.get('/messenger_small', function(req , res){
	res.sendFile(__dirname + '/index_small.html');
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;	
	console.log("ip-> "+ ip );		
});
