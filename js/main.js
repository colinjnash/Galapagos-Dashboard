/**
	Table of Contents:
		1. Onload Script:
			-Change Background
			-Clock
		2. Nav Menu Scripts
		3. Clock
		4. To Do List
***************************************************************/

/* Onload Scripts
*********************************************/
document.body.onload = function() {
	changeBackground(); 
	buildClock()
};

function changeBackground() {
	let arr = ['img0.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg'];
	document.body.style.background = "url('img/" + arr[Math.floor((Math.random() * 3))] + "')";
}

/* Nav Menu
*********************************************/
// Two functions to open and close side menu
document.getElementById('openMenu').onclick = function() {
	document.getElementById('leftNav').style.width = '250px'
};
document.getElementById('closeMenu').onclick = function () {
	document.getElementById('leftNav').style.width = '0'
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

	let t = setTimeout(buildClock, 500);
	let dayNight = 'AM';

	if ( h >= 13 ) {
		dayNight = 'PM';
		h -= 12; 
	}

	document.getElementById('clock').innerHTML = h + ':' + m + dayNight;
}

function addZero(i) {
	if ( i < 10 ) {
		return '0' + i;
	}
	return i;
}

/* To Do List
*********************************************/
// Loads data from input to list on right side bar
document.getElementById('submit').onclick = function insertItem() {
	let toDo = [];
	let item = document.getElementById('toDoItem');
	toDo.push(item.value);

	document.getElementById('rightNav').innerHTML += '<li>' + toDo + '</li>';

	// Clear out the input field
	item.value = '';
}
