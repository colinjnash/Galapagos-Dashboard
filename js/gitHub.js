$(document).ready(function() {

	gitHubDisplay = () => {
	
		let gitHubRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid +"/gitHub");

		gitHubRef.on("value", function(snapshot){
			let user = snapshot.val()["userName"];
			if(user !== null) {
				console.log(user);
				let pic = `https://api.github.com/users/${user}`;
				$.getJSON(pic, function(data, textStatus) {
					event.preventDefault();
					/*Add Pic to GitHub activity */
					let icon = data.avatar_url;
					$('#gitPic').attr("src", function(){
						$('#gitName').html(user);
						return data.avatar_url;
					}).removeClass("hidden");
				});
				console.log(pic);
				let url = `https://api.github.com/users/${user}/events/public`;
				$.getJSON(url, function(json, textStatus) {
					// Add activity to feed
					console.log(json);
				});
			}
			else {
				console.log("Github user does not exist");
			}
		});
	};
});