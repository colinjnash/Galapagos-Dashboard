
/*  Function: To-Do Add to List 
*********************************************************/
function toDo() {	
	if ( firebase.auth().currentUser ) {
		const form = document.querySelector("#todoForm");	
		form.addEventListener("submit", postTodo);

		const timeStamp = () => {
			let options = {
				month: '2-digit',
				day:   '2-digit',
				year:  '2-digit',
				hour:  '2-digit',
				minute:'2-digit'
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
			} else {
				error = document.querySelector('#errorMsg');
				error.innerHTML = "Both fields are required";
				clearAlert = () => {

					window.setTimeout(() => {
						// Todo...
						error.innerHTML = "";
					}, 2000);
						
				};

				clearAlert();
			}

			document.getElementById("todo").value = ''; // clear todo and user field
			document.getElementById("user").value = '';
		}

		// This is a firebase command to grab the data then call addTodo to do something with all data in the database
		let todoref = firebase.database().ref("users/" + firebase.auth().currentUser + "/todos");
		todoref.on("child_added", function(snapshot) {
			let todo = snapshot.val(); // firebase returns a snapshot of the database and assigns that to todo value
			addTodo(todo.todo, todo.user, todo.time);
		});

		// adds the results to the homepage
		const addTodo = (todo, user, timeStamp) => {
			let todos = document.getElementById("todos");
			todos.innerHTML += '<li class="todoli" >' + '<input type="checkbox">' + `${todo} - ${user}` + '<span class="delete">' + ' ' + '<i class="fa fa-trash"></i></span>' + '</li>';
		};		
	}
} // end of toDo function
