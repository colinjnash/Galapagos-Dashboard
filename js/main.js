/**
	Table of Contents:
		1. Onload Script:
			-Change Background
			-Clock
		2. Random Background Image Script	
		3. Nav Menu Scripts
		4. Clock
		5. To Do List
***************************************************************/

// Optional JQUERY load

/* Onload Scripts
 *********************************************/
// Fade in the div
$(document).ready(function($) {

	// Init Firebase
	initApp();
	// Chrome Authentication Token
	chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
	
	// Use the token.
		var provider = new firebase.auth.GoogleAuthProvider().credential(null,token);
		// var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
		firebase.auth().signInWithCredential(provider).then(function(result){
			var userId = firebase.auth().currentUser.uid;
			return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {

				gitHubDisplay();
				var username = snapshot.val().Name;
				$('#welcomeName').html(`Hello ${username}`);	

			});
		});
	});

	$('body').hide().fadeIn('slow');
	$(document).ready(function() {
		$('#welcome').removeClass('hidden');
	});

	// Execute Scripts Here!
	changeBackground();
	buildClock();
	accordion_menu();
	calculator();
	wxPop();

	/* Random Background Image Script
	 *********************************************/
	function changeBackground() {
		let arr = ['img0.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg'];
		$('body').css("background-image", "url('img/" + arr[Math.floor((Math.random() * 3))] + "')");
	}
	

	/* Nav Menu
	 *********************************************/
	// OPEN and CLOSE left navMenu	
	document.getElementById('openMenu').onclick = function() {
		document.getElementById('leftNav').style.width = '250px';
	};


	document.getElementById('closeMenu').onclick = function() {
		document.getElementById('leftNav').style.width = '0';
	};


	// Accordion Menus Open and Close
	function accordion_menu() {
		const accItems = document.getElementsByClassName('accordion');

		for ( let i = 0; i < accItems.length; i++ ) {
			accItems[i].onclick = function() {
				const panel = this.nextElementSibling;

				if ( panel.style.display === 'block' ) {
					panel.style.display = 'none';
				} else {
					panel.style.display = 'block';
				}
			};
		}
	}




	// ToDoToggle Functionality
	// *****************************************************************/
	$(document).on('click', '.delete', function(event) {
		var uid= firebase.auth().currentUser.uid;

		let content = $(this).parent().text().split("-");
		let key = content[0].replace(/((\s*\S+)*)\s*/, "$1");
		$(this).parent().fadeOut(300, function() {

			// ***************************To Do List FIREBASE 

			var ref = firebase.database().ref('/users/'+ uid + "/todos");
			var query = ref.orderByChild('todo').equalTo(key);
			// console.log(query);
			query.on('value', function(snapshot) {
				snapshot.forEach(function(data) {
					var record = data.val();
					if (record["todo"] == key) {
						ref.child(data.key).remove();
					}
				});
			});
		});
		event.stopPropagation();
	});

	$(document).on("click", 'input[type=checkbox]', function(event) {
		$(this).parent().toggleClass('completed');
		event.stopPropagation();

	});

	// ToDoDiv Toggle

	$('#toDoTitle').on('click', function() {
		$('#toggleList').toggleClass("hidden");
	});


	// ****************************************
	// GitHub Display
	// ****************************************


	$('#gitHubSubmit').on("submit", function(event){
		event.preventDefault();
		let gitHubRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid +"/gitHub");
		let userName = $('#gitHubSubmit > input[type="text"]').val();
		gitHubRef.set({userName: userName});
		gitHubDisplay();
		document.querySelector('#gitHubSubmit > input[type="text"]').value = '';
	});


// ********************WEATHER TRIAL *******************************


// DEPRECATED DUE TO BEST PRACTICES ACCORDING TO GOOGLE DEVELOPERS

// if(navigator.geolocation) {
// 	navigator.geolocation.getCurrentPosition(function (position, error) {
// 		if(error) {
// 			console.log(err or);
// 		} else {





});

