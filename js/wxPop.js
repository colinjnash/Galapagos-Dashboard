function wxPop() {
	$.ajax({
		url: 'https://ipinfo.io/json',
		type: 'GET',
		dataType: 'jsonp',
		success: function(location) {
			var city = location.city;
			var latlong = location.loc.split(",");
			var lat = latlong[0];
			var long = latlong[1];
			var url = "https://api.darksky.net/forecast/de76a4cf1da02a6495cc56ff1fbcc8cc/" + lat + ',' +
				long + '?units=auto';
			console.log(city);
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'jsonp',
				success: function(data) {

					// NESTED SKYCONS....WILL NEED TO MODULIZE THIS FOR FASTER LOADING
					var skycons = new Skycons({ "color": "white" });
					var icon = data.currently.icon;
					var temp = Math.round(data.currently.temperature);
					$('#wxtemp').html(temp + '&deg;C');
					skycons.add("wxIcons", icon);
					skycons.play();
					$('#cityList').html(city);
				},

				error: function(error) {
					console.log("error loading weather");

				}
			});
		}
	});



}