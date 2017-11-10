document.addEventListener('DOMContentLoaded', function() {
  var messagesList = document.getElementById('messages'),
      textInput = document.getElementById('text'),
      sendButton = document.getElementById('send'),
      username = "Jason";
  
  var app = firebase.initializeApp(config),
      database = app.database();
      
  var databaseRef = database.ref().child('chat');
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
    chatItem.innerHTML += '<li><div class="chatBubble reply"><img src="//www.gravatar.com/avatar/0?d=mm&s=30" class="avatar"/><small>'+ chat.name + ' says,</small><br>' + chat.message + '</div></li>';
    scrollToBottom("messages");
  }
});