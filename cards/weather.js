var weather = card('weather');
weather.config.schema = {
	units: new card.config.options('Temperature units', {
		f: 'Fahrenheit',
		c: 'Celsius'
	}),
	location: new card.config.text('Location', 'automatic')
};
weather.config.default = {
	units: 'f',
	location: 'automatic'
};

var apiKey = 'fa3194c70aa8c632';

var icons = {
	'chanceflurries': 'snow',
	'chancerain': 'rain',
	'chancesleet': 'sleet',
	'chancesnow': 'snow',
	'chancetstorms': 'thunderstorms',
	'chanceclear': 'sunny',
	'clear': 'sunny',
	'cloudy': 'cloudy',
	'flurries': 'snow',
	'fog': 'fog',
	'hazy': 'fog',
	'mostlycloudy': 'partly_cloudy',
	'mostlysunny': 'partly_cloudy',
	'partlycloudy': 'partly_cloudy',
	'partlysunny': 'partly_cloudy',
	'sleet': 'snow',
	'rain': 'rain',
	'snow': 'snow',
	'sunny': 'sunny',
	'tstorms': 'thunderstorms'
};

weather.prototype.getLocation = function(callback){
	if (this.config.location != 'automatic') {
		callback(this.config.location);
	} else {
		getLocation(function(loc){
			callback(loc.lat+','+loc.long);
		});
	}
};

weather.prototype.controller = function(callback){
	var self = this;
	this.getLocation(function(loc){
		var cacheKey = 'weather_'+loc;
		var out = cache.get(cacheKey);
		if (out) {
			callback && callback(out);
			return;
		} else {
			out = {};
		}
		
		var finish = function(){
			var ttl = 1000 * 60 * 60;
			var now = new Date();
			if (now.getHours() == 11) {
				var ttl = 3600000-((now.getMinutes()*60000)+(now.getSeconds()*1000)+now.getMilliseconds());
			}
			cache.set(cacheKey, out, ttl);
			callback && callback(out);
		};
		
		var finished = 0;
		
		$.getJSON('https://api.wunderground.com/api/'+apiKey+'/conditions/q/'+loc+'.json?callback=?', function(data){
			var current = data.current_observation;
			out.current = {
				temperature: {f: Math.round(current.temp_f), c: Math.round(current.temp_c)},
				location: current.display_location.full,
				icon: 'https://ssl.gstatic.com/onebox/weather/128/'+icons[current.icon]+'.png',
				conditions: current.weather
			};
			
			finished++;
			if (finished == 2) finish();
		});
		
		$.getJSON('https://api.wunderground.com/api/'+apiKey+'/forecast/q/'+loc+'.json?callback=?', function(data){
			var forecast = data.forecast.simpleforecast.forecastday;
			out.forecast = [];
			for (var i in forecast) {
				out.forecast.push({
					day: (i == 0) ? 'Today' : forecast[i].date.weekday_short,
					icon: 'https://ssl.gstatic.com/onebox/weather/64/'+icons[forecast[i].icon]+'.png',
					high: {f: forecast[i].high.fahrenheit, c: forecast[i].high.celsius},
					low: {f: forecast[i].low.fahrenheit, c: forecast[i].low.celsius}
				});
			}
			finished++;
			if (finished == 2) finish();
		});
	});
};

weather.prototype.setup = function(){
	this.element.html('<h2 class="location"></h2><img class="current_icon" src="https://ssl.gstatic.com/onebox/weather/128/sunny.png" alt=""/><div class="current_text"><p class="current_temperature"></p><p class="current_conditions"></p></div><div style="clear:both"></div><ul class="forecast"></ul><div style="clear:both"></div>');
};

weather.prototype.view = function(data){
	this.element.find('.current_temperature').html(data.current.temperature[this.config.units]+'&deg;');
	this.element.find('.location').text(data.current.location);
	this.element.find('.current_icon').attr('src', data.current.icon);
	this.element.find('.current_conditions').text(data.current.conditions);
	
	this.element.find('.forecast').html('');
	for (var i in data.forecast) {
		var el = $('<li><span class="day"></span><img alt="" class="icon"/><span class="temp"><span class="high"></span> <span class="low"></span></span></li>');
		
		el.find('.day').text( (i == 0) ? 'Today' : data.forecast[i].day );
		el.find('.icon').attr('src', data.forecast[i].icon);
		el.find('.high').html(data.forecast[i].high[this.config.units]+'&deg;');
		el.find('.low').html(data.forecast[i].low[this.config.units]+'&deg;');
		
		el.appendTo(this.element.find('.forecast'));
	}
};
