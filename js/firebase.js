// Initialize Firebase
var config = {
	apiKey: 'AIzaSyC5Z-AsLjvNuZGLAD-rlevGBpWTfkjs-9c',
	authDomain: 'turtles3-dashboard.firebaseapp.com',
	databaseURL: 'https://turtles3-dashboard.firebaseio.com',
	projectId: 'turtles3-dashboard',
	storageBucket: 'turtles3-dashboard.appspot.com',
	messagingSenderId: '145357060562'
};

firebase.initializeApp(config);

const form = document.querySelector("form");


function initApp() {

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		// User is signed in.
			var ref = firebase.database().ref("todos/" + firebase.auth().currentUser.uid);
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			// [END_EXCLUDE]
			console.log(providerData);
			form.addEventListener("submit", postTodo);

			const timeStamp = () => {
				let options = {
					month: '2-digit',
					day: '2-digit',
					year: '2-digit',
					hour: '2-digit',
					minute: '2-digit'
				};
				let now = new Date().toLocaleString('en-US', options);
				return now;
			};
			// Add todo to firebase database
			function postTodo(e) {
				e.preventDefault();
				let todo = document.getElementById("todo").value; // gets the todo field assigns to todo
				let user = document.getElementById("user").value; // gets user field and assigns to user

				// if user and todo exist will push all the data to the reference of the database '/todos' as assigned from above
				if (todo && user) {
					ref.push({
						todo: todo,
						user: user,
						time: timeStamp()
					});
				}

				document.getElementById("todo").value = ''; // clear todo and user field
				document.getElementById("user").value = '';
			}

			// This is a firebase command to grab the data then call addTodo to do something with all data in the database
			ref.on("child_added", function(snapshot) {
				let todo = snapshot.val(); // firebase returns a snapshot of the database and assigns that to todo value
				addTodo(todo.todo, todo.user, todo.time);
			});

			// adds the results to the homepage
			const addTodo = (todo, user, timeStamp) => {
				let todos = document.getElementById("todos");
				todos.innerHTML += '<li class="todoli" >' + '<input type="checkbox">' + `${todo} - ${user}` + '<span class="delete">' + ' ' + '<i class="fa fa-trash"></i></span>' + '</li>';
			};	
		}
	});




}

initApp();
