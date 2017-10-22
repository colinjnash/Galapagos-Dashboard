// Script to load random background
document.body.onload = changeBackground();
document.body.onload = buildClock();

function changeBackground() {
	let arr = ['img0.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg'];
	document.body.style.background = "url('img/" + arr[Math.floor((Math.random() * 3))] + "')";
}


// Two functions to open and close side menu
document.getElementById('openMenu').onclick = function() {
	document.getElementById('leftNav').style.width = '250px'
};
document.getElementById('closeMenu').onclick = function () {
	document.getElementById('leftNav').style.width = '0'
};


// Web clock on the front page
function buildClock() {
	let clock = new Date();
	let h = clock.getHours();
	let m = clock.getMinutes();
	let s = clock.getSeconds();

	m = addZero(m);
	s = addZero(s);	

	let t = setTimeout(buildClock, 500);

	document.getElementById('clock').innerHTML = h + ':' + m + ':' + s;
}

function addZero(i) {
	if ( i < 10 ) {
		return '0' + i;
	}
	return i;
}

