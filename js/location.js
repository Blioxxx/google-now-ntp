var getLocation = function(callback){
	if (localStorage.latitude && localStorage.longitude) {
		callback && callback({lat: localStorage.latitude*1, long: localStorage.longitude*1});
		callback = undefined;
	}
	navigator.geolocation.getCurrentPosition(function(pos){
		localStorage.latitude = pos.coords.latitude;
		localStorage.longitude = pos.coords.longitude;
		callback && callback({lat: localStorage.latitude*1, long: localStorage.longitude*1});
	});
};
