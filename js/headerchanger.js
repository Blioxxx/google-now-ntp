var doBanner = function(){
	getLocation(function(pos){
		var now = (new Date()).getTime();
		var times = SunCalc.getTimes(new Date(), pos.lat, pos.long);
		var img;
		if (now >= times.dawn.getTime() && now <= times.goldenHourEnd.getTime()) {
			img = 'dawn';
		} else if (now >= times.goldenHourEnd.getTime() && now <= times.dusk.getTime()) {
			img = 'day';
		} else if (now >= times.dusk.getTime() && now <= times.night.getTime()) {
			img = 'dusk';
		} else {
			img = 'night';
		}
		document.getElementsByTagName('html')[0].setAttribute('class', img);
	});
};

doBanner();

setInterval(doBanner, 1000 * 60);
