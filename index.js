

var socket = io().connect('http://snf-537850.vm.okeanos.grnet.gr');

var notification = new Audio("http://snf-537850.vm.okeanos.grnet.gr/messenger/notification.mp3");		
	


$('#main').hide(); //hide the main


var username; //store the username 
$('#login_form').submit(function(){      //sent the message to the server
    username = $('#login_text').val();		//take the string 
	socket.emit('connection',username);    //send the username when a user connect        
    socket.emit('chat message', username ,"hi all");
    return false;
});
	
//if(username == null || username == ""){username = "anonymous";}

socket.on('username problem',function(ans,name){  //check if the username is unique
	if(name == username){ 	
		if(ans == false){	
			check_username();  //if ans == true -> go on 
			$('#chatMessages').append( $('<li>').html("<span class='color_text'>"+time()+" Welcome "+ username+"</span>")); $("span:last").css("color","black"); //print a welcome message
			//$('#message').focus();	//focus on this input
		}   
		else{	$('#notify').text("please choose an other name");} //the name already exist
	}
});
	


  $('#send-message').submit(function(){   //sent the message to the server
    socket.emit('chat message', username ,$('#message').val() );
    $('#message').val('');
    return false;
  });

var par; //empty string 
	
	function is_typing(par){	//detect is someone is typing
		if( $('#message').val() != '' ){ //if the user has write something
			if(par != $('#message').val() ){  //if the user write something new from the last time				
				//console.log(  $('#message').val()  );
				socket.emit('is typing', username); //this user type something
			}		
		}	
		return $('#message').val(); //the new value of the <input> text area
	}
				
	setInterval(function(){ par = is_typing(par) } , 1000); //run the function every 1 sec
		                     //  the old value is the argument and the new value is the return of the function
	
	socket.on('is typing',function(name){ //print who is typing
		if(name != username ){ //do not tell that i am typing!!!, i know it !!		
			$('#typing_info').html( name + " is typing..." );
			setTimeout (function(){ $('#typing_info').html(' ') } ,1000 ); //after 1 sec delete the notification
		}	
	});

	
  socket.on('chat message', function(name , msg){     //receive the message that will be printed			 			 		 		 
		 var message = time() + '<span class="color_text">'+name+': '+"</span>" + msg;			 
		 var empty="";
		 var flag=false; if(name == username){flag =true;} //true == flag, means that george write to george
		 links_find(empty, message ,flag);                                      //find the hyperlinks and print the message
		 //$('#chatMessages').append( $('<li>').html(message) );             //print the message		
		
		 $("#chat").animate({"scrollTop": $('#chat')[0].scrollHeight}, "slow");  //scroll the bar
		 	if(name != username ){notification.play();}                           //play notification sound  
  });
  
  socket.on('update usernames', function(array){
			$('#user_list').empty();                //remove all the li from the ol		
  		for(var i=0; i<array.length ;i++){	       //print all the usernames
		  $('#user_list').append($('<li>').text(array[i]));
		} 
  });
  
  
  
//--------- test area -----
//var peer = new Peer({key: '6iebjx1b41nyiudi'});

var past="";
setInterval(function(){
	if( $("#ta").val() != past){
		socket.emit("text page", $("#ta").val(), username );
		 past = $("#ta").val(); //the old value of the textarea
	}

},50);

	socket.on("text page",function(text,name){
			if(name != username){
				$("#ta").val(text);
			}
	});


