/* Calculator 
 *********************************************/
function calculator() {				
	const window_panel = document.getElementById('window_panel');
	const sub_window_panel = document.getElementById('sub_window_panel');
	const buttons = document.getElementsByClassName('calculator');
	let screen = '';
	let eh = '';		
	let total = 0;
	let counter = 0;
	let stageArr = [];
	let eqArr = [];


	for ( let i = 0; i < buttons.length; i++ ) {
		buttons[i].onclick = function btnFn(btn) {
			let btns = {
				'c':       () => { console.log('clear'); clear(); },
				'bs':      () => { backSpace(); },
				'.':       () => { addPoint(); },
				'+':       () => { addition(); },
				'-':       () => { subtraction();	},
				'*':       () => { multiplication(); },
				'/':       () => { division(); },
				'%':       () => { modulus(); },
				'default': () => { defaultNum(btn); }
			};

			return (btns[btn] || btns['default']);
		};
	}



	function defaultNum(num) {
		stageArr.push(num);
		console.log('stgArr after keystroke: ' + stageArr);
		screen = screen.concat(num);
		setMainText(screen);
		setSubText(screen);
	}	

	function setMainText(n) {
		window_panel.innerHTML = n;
	}

	function setSubText(n) {
		sub_window_panel.innerHTML = n;
	}

	function createNumber() {
	// Combine the first array to create number
		stageArr = stageArr.join('');	
		console.log(stageArr);
		// Push variable into a new array
		eqArr.push(stageArr);
		console.log(eqArr);
		// Clear stageArr for next number
		stageArr = [];
	}

	function addPoint() {
		if ( !stageArr.includes('.') ) {
			screen += '.';
			stageArr.push('.');
			setMainText(screen);
			setSubText(screen);
		}
	}	

	function backSpace() {
		let spaces = stageArr.length * -1;
		screen = screen.slice(0, spaces);
		setMainText(screen);
		setSubText(screen);
		stageArr = [];
	}

	function clear() {
		screen = '';
		eh = '';		
		total = 0;
		counter = 0;
		stageArr = [];
		eqArr = [];
		setMainText('');
		setSubText('');			
	}	

	function addition() {
	// Equation History	and create number to store in eqArr							
		eh = '+';
		createNumber();
		// Take final number and add it to total variable						
		total += Number(eqArr[counter]);		
		// Set the total value to the screen of the calc			
		setMainText(total);
		// Add to the sub screen for display						
		screen += '+';
		setSubText(screen);
		// Add one to counter
		counter++;			
	}
	
	function subtraction() {
	// Equation History	and create number to store in eqArr							
		eh = '-';
		createNumber();
		// Check to see if there is more than one value in eqArr 
		if ( eqArr.length === 1 ) {
			total = eqArr[0];
		} else {
			total -= Number(eqArr[counter]);
		}									
		// Set the total value to the screen of the calc			
		setMainText(total);
		// Add to the sub screen for display	
		screen += '-';
		setSubText(screen);					
		// Add one to counter
		counter++;			
	}		

	function multiplication() {
	// Equation History	and create number to store in eqArr								
		eh = '*';
		createNumber();											
		// If total starts at 0 make it 1 for multiplication to work
		if ( total === 0 ) {
			total = 1;
		}
		total *= Number(eqArr[counter]);		
		// Set the total value to the screen of the calc			
		setMainText(total);
		// Add to the sub screen for display	
		screen += '*';
		setSubText(screen);					
		// Add one to counter
		counter++;			
	}

	function division() {
	// Equation History	and create number to store in eqArr							
		eh = '/';
		createNumber();										
		// Check length to determine init total
		if ( eqArr.length === 1 ) {
			total = eqArr[0];
		} else if ( eqArr.length >= 2 ) {
			total /= Number(eqArr[counter]);		
		}
		// Set the total value to the screen of the calc			
		setMainText(total);
		// Add to the sub screen for display	
		screen += '/';
		setSubText(screen);					
		// Add one to counter
		counter++;				
	}		

	function modulus() {
	// Equation History	and create number to store in eqArr							
		eh = '%';
		createNumber();										
		// Check length to determine init total
		if ( eqArr.length === 1 ) {
			total = eqArr[0];
		} else if ( eqArr.length >= 2 ) {
			total %= Number(eqArr[counter]);		
		}
		// Set the total value to the screen of the calc			
		setMainText(total);
		// Add to the sub screen for display	
		screen += '%';
		setSubText(screen);					
		// Add one to counter
		counter++;				
	}

	function evaluate(history) {
		switch(history) {
		case "+":
			createNumber();
			total += Number(eqArr[eqArr.length - 1]);
			setMainText(total);
			setSubText(screen + '=' + total);
			break;
		case "-":
			createNumber();
			total -= Number(eqArr[eqArr.length - 1]);
			setMainText(total);
			setSubText(screen + '=' + total);				
			break;
		case "*":
			createNumber();
			total *= Number(eqArr[eqArr.length - 1]);
			setMainText(total);
			setSubText(screen + '=' + total);				
			break;
		case "/":
			createNumber();
			total /= Number(eqArr[eqArr.length - 1]);
			setMainText(total);
			setSubText(screen + '=' + total);
			break;
		case "%":
			createNumber();
			total %= Number(eqArr[eqArr.length - 1]);
			setMainText(total);
			setSubText(screen + '=' + total);
			break;					
		default:
			break;
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
