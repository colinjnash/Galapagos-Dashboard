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
		var ref =firebase.database().ref("users/" + firebase.auth().currentUser.uid);
		var contentRef =firebase.database().ref("users/" + firebase.auth().currentUser.uid +"Name");
		// User is signed in.
		contentRef.on("value", function(snapshot) {
			if (snapshot.val() == null) {

				ref.set({
					Name :user.displayName,
					email : user.email,
					emailVerified: user.emailVerified,
					photoURL:  user.photoURL,
					isAnonymous : user.isAnonymous,
					uid : user.uid,
				});
			}
		});
		// [END_EXCLUDE]
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
				let todoref = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/todos");
				todoref.push({
					todo: todo,
					user: user,
					time: timeStamp()
				});
			}

			document.getElementById("todo").value = ''; // clear todo and user field
			document.getElementById("user").value = '';
		}

		// This is a firebase command to grab the data then call addTodo to do something with all data in the database
		let todoref = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/todos");
		todoref.on("child_added", function(snapshot) {
			let todo = snapshot.val(); // firebase returns a snapshot of the database and assigns that to todo value
			addTodo(todo.todo, todo.user, todo.time);
		});

		// adds the results to the homepage
		const addTodo = (todo, user, timeStamp) => {
			let todos = document.getElementById("todos");
			todos.innerHTML += '<li class="todoli" >' + '<input type="checkbox">' + `${todo} - ${user}` + '<span class="delete">' + ' ' + '<i class="fa fa-trash"></i></span>' + '</li>';
		};
		

	});




}