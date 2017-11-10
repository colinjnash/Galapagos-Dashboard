document.addEventListener('DOMContentLoaded', function() {
  var messagesList = document.getElementById('messages'),
      textInput = document.getElementById('text'),
      sendButton = document.getElementById('send');
	  var username = '';
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
      
  var databaseRef = firebase.database().ref("chat/");
  sendButton.addEventListener('click', function(evt) {
    var chat = { name: username, message: textInput.value };
    databaseRef.push().set(chat);
    textInput.value = '';
  });
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
    chatItem.innerHTML += '<li><div class="chatBubble reply"><small>'+ chat.name + ' says,</small><br>' + chat.message + '</div></li>';
    scrollToBottom("messages");
  }
});