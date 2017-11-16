

/*  Initialize Firebase
*********************************************************/
var config = {
	apiKey: 'AIzaSyC5Z-AsLjvNuZGLAD-rlevGBpWTfkjs-9c',
	authDomain: 'turtles3-dashboard.firebaseapp.com',
	databaseURL: 'https://turtles3-dashboard.firebaseio.com',
	projectId: 'turtles3-dashboard',
	storageBucket: 'turtles3-dashboard.appspot.com',
	messagingSenderId: '145357060562'
};

firebase.initializeApp(config);


/*  Sign-In Process
*********************************************************/
function register() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;	

	if ( email.length < 4 ||
		 email.indexOf('@') === -1 ) {
		alert('Please enter in a valid email.');
	}

	if ( password.length < 4 ) {
		alert('Password must be longer than 4 characters.');
	}			
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		let errorCode = error.code;
		let errorMsg = error.message;		
		if ( errorCode ) {
			alert(errorMsg);
		}
		console.log(error);
	});	
	$('#logInOut').removeClass('hidden');
	$('#submitForms').addClass('hidden');
	resetText();
}

function signIn() {
	if ( firebase.auth().currentUser ) {
		firebase.auth().signOut();
	} 
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;	
	if ( email.length < 4 ||
		 email.indexOf('@') === -1 ) {
		alert('Please enter in a valid email.');
	}

	if ( password.length < 4 ) {
		alert('Password must be longer than 4 characters.');
	}

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(){
		let errorCode = error.code;
		let errorMsg = error.message;		
		if ( errorCode ) {
			alert(errorMsg);
		}
		console.log(error);		
	});	
	document.getElementById('signInStatus').textContent = 'Signed in as: ' + user.displayName;
	$('#logInOut').removeClass('hidden');
} //end signin

function googleSignIn() {	
	let provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
	});

	console.log('Token: ' + token);
	console.log('User: '+ result.user);

}

function signOut() {
	if ( firebase.auth().currentUser ) {
		firebase.auth().signOut();
	}
	document.getElementById('signInStatus').textContent = '';
	$('#logInOut').addClass('hidden');
	$('#submitForms').removeClass('hidden');	
}

function initFirebase() {
	firebase.auth().onAuthStateChanged(function(user) {
		if ( user ) {
			let displayName   = user.displayName;
			let email         = user.email;
			let emailVerified = user.emailVerified;
			let photoURL      = user.photoURL;
			let isAnonymous   = user.isAnonymous;
			let uid           = user.uid;
			let providerData  = user.providerData;	
			document.getElementById('signInStatus').textContent = 'Signed in as: ' + displayName;		
		}
		//document.getElementById('statusMonitor').textCenter = '';
	});

	document.getElementById('register').addEventListener('click', register, false);
	document.getElementById('signIn').addEventListener('click', signIn, false);
	document.getElementById('logInOut').addEventListener('click', signOut, false);
	document.getElementById('signInGoogle').addEventListener('click', googleSignIn, false);
}


/* Functions
************************************************************/
function resetText() {
	email.value = '';
	password.value = '';
}
