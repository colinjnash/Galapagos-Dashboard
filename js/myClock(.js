function myClock() {
	let clock = newDate();
	let h = clock.getHours();
	let m = clock.getMinutes();
	let s = clock.getSeconds();

	return h + ':' + m + ':' + s;
}