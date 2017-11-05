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
	$('body').hide().fadeIn('slow');
	$(document).ready(function() {
		$('#welcome').removeClass('hidden');
	});

	// Execute Scripts Here!
	changeBackground();
	buildClock();
	accordion_menu();
	calculator();



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
			}
		}
	}

	/* Calculator 
	 *********************************************/
	function calculator() {				
		const numbers = document.getElementsByClassName('numbers');
		const equations = document.getElementsByClassName('equations');
		const window_panel = document.getElementById('window_panel');
		const sub_window_panel = document.getElementById('sub_window_panel');
		let total = 0;
		let value = 0;
		let counter = 0;
		let arrNum = [];
		let et = '';

		// Iterate through number values on calc and will push into an array
		for ( let i = 0; i < numbers.length; i++ ) {			
			numbers[i].onclick = function() {		
				if ( window_panel.innerHTML == 0 ) {
					window_panel.innerHTML = '';
				}				
				value = window_panel.innerHTML += numbers[i].value;					
			}
				
			// Listens for equation symbol to be clicked
			for ( let k = 0; k < equations.length; k++ ) {
				equations[k].onclick = function() {
					// Variables					
					let e = equations[k].value;
					

					// Push value of number once equation has been clicked into arr X
					arrNum.push(Number(value));

					// Reset main window to 0
					window_panel.innerHTML = Number(total);
					
					// Add value to the sub window for historical purposes
					sub_window_panel.innerHTML += arrNum[counter] + ' ' + e + ' ';

					// Equation Expressions				
					switch(e) {
						case "+":
							total += Number(value);						
							et = "+";							
							break;
						case "-":
							console.log('Before: ' + total);
							total -= Number(value);
							et = "-";
							console.log('After: ' + total);
							break;
						case "/":
							total /= value;
							et = "/";
							break;
						case "*":
							total *= value;
							et = "*";
							break;
						case "%":
							total %= value;
							et = "%";
							break;
						case "c":
							total = 0;
							window_panel.innerHTML = 0;
							sub_window_panel.innerHTML = ''; 
							console.log(arrNum);
							break;
						case "=":
							switch(et) {
								case "+":
									total += Number(value);
									break;
								case "-":
									total -= Number(value);
									break;
								case "*":
									total *= Number(value);
									break;
								case "/":
									total /= Number(value);
									break;
								case "%":
									total %= Number(value);
									break;
							}	

							// Print the new total to window panel
							window_panel.innerHTML = total;		

							break; //case =: break
					}

					// Empty the array after equation has been complete
					counter++;							
				}
			}
		}
	}



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
						console.log(error);
					}
				});
			}
		});



	}

	wxPop();

});