document.addEventListener('DOMContentLoaded', function() {
	var messagesList = document.getElementById('messages'),
		textInput = document.getElementById('text'),
		sendButton = document.getElementById('send');
	var username = '';
	channelInput = document.getElementById('channelInput');
	var channelID = '';



	chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
	
	// Use the token.
		var provider = new firebase.auth.GoogleAuthProvider().credential(null,token);
		// var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
		firebase.auth().signInWithCredential(provider).then(function(result){
			var userId = firebase.auth().currentUser.uid;
			return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
				username = snapshot.val().Name;	
				console.log(username);

			});
		});
	});
	
	//  *****************************************
	// Chat Channel Code
	//  *****************************************	
	var channelRef = firebase.database().ref("chat/" + "channel");
	channelInput.addEventListener('keypress', function(e) {
		if(e.keyCode == 13 && channelInput.value != ''){
		// submit
			e.preventDefault();
		
			let channel = channelInput.value;
			channelRef.push().update({channel:channel});
			channelInput.value = '';
		}
	});
	/* Act on the event ******************TESTING FOR CHANNEL PROCESSING*/
	channelRef.on("value", function(snapshot) {
		channelID = snapshot.val().channel;
		console.log(channelID);
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});

	//  *****************************************
	// Chat Relay Code
	//  *****************************************
	var databaseRef = firebase.database().ref("chat/");
	sendButton.addEventListener('click', function(evt) {
		var chat = { name: username, message: textInput.value };
		databaseRef.push().set(chat);
		textInput.value = '';
	});

	textInput.onkeydown = function(e){
		if(e.keyCode == 13 && textInput.value != ''){
		// submit
			var chat = { name: username, message: textInput.value };
			databaseRef.push().set(chat);
			textInput.value = '';
		}
	};

	databaseRef.on('child_added', function(snapshot) {
		var chat = snapshot.val();
		addMessage(chat);
	});

	function scrollToBottom (id) {
		var div = document.getElementById(id);
		div.scrollTop = div.scrollHeight - div.clientHeight;
	}
	
	function addMessage(chat) {
		let chatItem = document.getElementById("messages");
		chatItem.innerHTML += '<li><div class="chatBubble reply"><strong>'+ chat.name + ':</strong><span class="msgContent">' + chat.message + '</span></div></li>';
		scrollToBottom("messages");
	}
	
});