var getLocation = function(callback){
	if (cache.get('location')) {
		callback && callback(cache.get('location'));
	} else {
		navigator.geolocation.getCurrentPosition(function(pos){
			var out = {
				lat: pos.coords.latitude,
				long: pos.coords.longitude
			};
			cache.set('location', out, 1000 * 60);
			callback && callback(out);
		});
	}
};
