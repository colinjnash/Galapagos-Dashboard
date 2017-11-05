/**
	Table of Contents:
		1. Onload Script:
			-Change Background
			-Clock
		2. Nav Menu Scripts
		3. Clock
		4. To Do List
***************************************************************/

// Optional JQUERY load

/* Onload Scripts
 *********************************************/
$(document).ready(function($) {

	chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
	// Use the token.

		var provider = new firebase.auth.GoogleAuthProvider().credential(null,token);
		// var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
		firebase.auth().signInWithCredential(provider).then(function(result){
			var username = result.displayName;
			$('#welcomeName').html(`Hello ${username}`);
	
		});


	});


	$('body').hide().fadeIn('slow');
	$(document).ready(function() {
		$('#welcome').removeClass('hidden');
	});


	changeBackground();
	buildClock();




	function changeBackground() {
		var arr = ['img0.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg'];
		$('body').css("background-image", "url('img/" + arr[Math.floor((Math.random() * 3))] + "')");
	}

	// Fade in the div







	/* Nav Menu
	 *********************************************/
	// Two functions to open and close side menu
	document.getElementById('openMenu').onclick = function() {
		document.getElementById('leftNav').style.width = '250px';
	};
	document.getElementById('closeMenu').onclick = function() {
		document.getElementById('leftNav').style.width = '0';
	};

	/* Clock
	 *********************************************/
	// Web clock on the front page
	function buildClock() {
		let clock = new Date();
		let h = clock.getHours();
		let m = clock.getMinutes();
		// let s = clock.getSeconds();

		m = addZero(m);
		// s = addZero(s);		

		// let t = setTimeout(buildClock, 500);
		let dayNight = ' AM';

		if (h > 12) {
			dayNight = ' PM';
			h -= 12;
		} else if (h == 12) {
			dayNight = ' PM';
		} else if (h == 0) {
			dayNight = ' AM';
		}

		document.getElementById('clock').innerHTML = h + ':' + m + dayNight;
	}

	function addZero(i) {
		if (i < 10) {
			return '0' + i;
		}
		return i;
	}



	//*********************************************/


	// Loads data from input to list on right side bar
	// $('input#toDoItem').keypress(function(e) {

	// 	if (e.which === 13) {

	// 		let toDoText = $(this).val();


	// 		$('#toggleList').append('<li class="todo" >' + '<input type="checkbox">' + `${todo} - ${user}` + '<span class="delete">' + ' ' + '<i class="fa fa-trash"></i></span>' + '</li>');

	// 		// Clear out the input field
	// 		$(this).val('');
	// 		e.preventDefault();
	// 	}

	// });

	// $('span').on('click', function() {

	// });

	// ToDoToggle Functionality
	// *****************************************************************/
	$(document).on('click', '.delete', function(event) {
		let content = $(this).parent().text().split("-");
		let key = content[0].replace(/((\s*\S+)*)\s*/, "$1");
		$(this).parent().fadeOut(300, function() {

			// ***************************To Do List FIREBASE 

			var ref = firebase.database().ref('/todos');
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


	// ********************WEATHER TRIAL *******************************


	// DEPRECATED DUE TO BEST PRACTICES ACCORDING TO GOOGLE DEVELOPERS

	// if(navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(function (position, error) {
	// 		if(error) {
	// 			console.log(err or);
	// 		} else {

	function wxPop() {
		$.ajax({
			url: 'https://ipinfo.io/json',
			type: 'GET',
			dataType: 'jsonp',
			success: function(location) {
				
				var latlong = location.loc.split(",");
				var lat = latlong[0];
				var long = latlong[1];
				var url = "https://api.darksky.net/forecast/de76a4cf1da02a6495cc56ff1fbcc8cc/" + lat + ',' +
					long + '?units=auto';
				
				$.ajax({
					url: url,
					type: 'GET',
					dataType: 'jsonp',
					success: function(data) {

						// NESTED SKYCONS....WILL NEED TO MODULIZE THIS FOR FASTER LOADING
						var skycons = new Skycons({ "color": "white" });
						var icon = data.currently.icon;
						var temp = Math.round(data.currently.temperature);
						$('#wxtemp').html(temp + '&deg;C');
						skycons.add("wxIcons", icon);
						skycons.play();

					},

					error: function(error) {
						console.log("error loading weather");

					}
				});
			}
		});



	}

	wxPop();

});



// *****************************************************************
// Credential login
// *****************************************************************

