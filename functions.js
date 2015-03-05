

function check_username(){ //check if the username is valid

$('#login').hide(); //hide the login panel
$('#main').show();

}


function time(){ //return the time...
	
	var t = new Date();
	var ans = "[";
	
	if(t.getHours() <10){ ans += "0"+t.getHours()+":";}
	else 	ans += t.getHours()+":";
	
	if(t.getMinutes() <10){ ans += "0"+t.getMinutes()+":";}
	else 	ans += t.getMinutes()+":";
	
	if(t.getSeconds() <10){ ans += "0"+t.getSeconds()+"] ";}
	else 	ans += t.getSeconds()+"] ";

	return ans;
}

function links_find(output , msg ,flag ){ //find if the string contain a hyperlink
//output => put here the sting that i have process
//msg => the string that i have not process
//flag true if the message is send by the receiver

if(msg != ""){ //if there are letters

	var start_of_link = msg.indexOf("www.",0); //find if there is a "www." string , from the position 0 until msg.length 	
	
	if(start_of_link >= 0){ //there is a link !

   	var end_of_link = msg.indexOf(' ', start_of_link+1 )-1;            //find the end of the link , -1 => do not link the space
		if(end_of_link  < 0 ){ end_of_link = msg.length;} 				 // -1 => hyperlink is the last word of the string


	   output +=  msg.substr(0,start_of_link) + "<a target='_blank' href= "+ 'http://'+msg.substr(start_of_link,end_of_link) + ">"+  msg.substring(start_of_link,end_of_link+1) +"</a>";   
		msg = msg.substr(end_of_link+1); //the remain text

		if(msg== -1){msg = "";}		
		
		links_find(output , msg ,flag); //call the function again until the msg == ""
		
	}//if there is a link
	else{
		$('#chatMessages').append( $('<li>').html(output + msg)); //if there is not exist a link , maybe there are links at the previous recursion
		if(flag==true){ $('span:last').css("color","red"); }	//if i speak color
	}  
}
else{ //msg is empty, all the text is in the output, the string finish with a hyperlink	
	$('#chatMessages').append( $('<li>').html(output)); //add a <li>
	if(flag==true){ $('span:last').css( "color","red");}	//if i speak color
}

}//end of function


