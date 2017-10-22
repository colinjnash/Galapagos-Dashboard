document.getElementById('change').onload = changeBackground();

function changeBackground() {
	let arr = ['img0.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];
	document.body.style.background = "url('img/" + arr[Math.floor((Math.random() * 3))] + "')";
}