

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
	firebase.auth().createUserWithEmailAndPassword(email, password).cath(function(error) {
		let errorCode = error.code;
		let errorMsg = error.message;		
		if ( errorCode ) {
			alert(errorMsg);
		}
		console.log(error);
	});	
}

function signIn() {
	if ( firebase.auth().currentUser ) {
		firebase.auth().signOut();
	} else {
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
	}	
}

// function googleSignIn() {	
// 	let provider = new firebase.auth.GoogleAuthProvider();
// 	firebase.auth().signInWithRedirect(provider);

// }

function signOut() {
	if ( firebase.auth().currentUser ) {
		firebase.auth().signOut();
	}
	document.getElementById('signInStatus').textContent = 'Logged Out';
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
		//document.getElementById('statusMonitor').textCenter = 'Signed In';
	});

	document.getElementById('register').addEventListener('click', register, false);
	document.getElementById('signIn').addEventListener('click', signIn, false);
	document.getElementById('logInOut').addEventListener('click', signOut, false);
	// document.getElementById('signInGoogle').addEventListener('click', googleSignIn, false);
}


