document.getElementById('change').onload = changeBackground();

function changeBackground() {
	const arr = ['img0.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg'];
	document.body.style.background = "url('img/" + arr[Math.floor((Math.random() * 3))] + "')";
}