var weather = card('weather');
weather.config.schema = {};
weather.config.default = {};

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

weather.prototype.controller = function(callback){
	var out = {};
	
	getLocation(function(loc){
		var q = '/q/'+loc.lat+','+loc.long;
		var finished = 0;
		
		$.getJSON('https://api.wunderground.com/api/'+apiKey+'/conditions'+q+'.json?callback=?', function(data){
			var current = data.current_observation;
			out.current = {
				temperature: Math.round(current.temp_f),
				location: current.display_location.full,
				icon: 'https://ssl.gstatic.com/onebox/weather/128/'+icons[current.icon]+'.png',
				conditions: current.weather
				
			};
			
			finished++;
			if (finished == 2) callback && callback(out);
		});
		
		$.getJSON('https://api.wunderground.com/api/'+apiKey+'/forecast'+q+'.json?callback=?', function(data){
			var forecast = data.forecast.simpleforecast.forecastday;
			out.forecast = [];
			for (var i in forecast) {
				out.forecast.push({
					day: (i == 0) ? 'Today' : forecast[i].date.weekday_short,
					icon: 'https://ssl.gstatic.com/onebox/weather/64/'+icons[forecast[i].icon]+'.png',
					high: forecast[i].high.fahrenheit,
					low: forecast[i].low.fahrenheit
				});
			}
			finished++;
			if (finished == 2) callback && callback(out);
		});
	});
};

weather.prototype.setup = function(){
	this.element.html('<h2 class="location"></h2><img class="current_icon" src="https://ssl.gstatic.com/onebox/weather/128/sunny.png" alt=""/><div class="current_text"><p class="current_temperature"></p><p class="current_conditions"></p></div><div style="clear:both"></div><ul class="forecast"></ul><div style="clear:both"></div>');
};

weather.prototype.view = function(data){
	this.element.find('.current_temperature').html(data.current.temperature+'&deg;');
	this.element.find('.location').text(data.current.location);
	this.element.find('.current_icon').attr('src', data.current.icon);
	this.element.find('.current_conditions').text(data.current.conditions);
	
	for (var i in data.forecast) {
		var el = $('<li><span class="day"></span><img alt="" class="icon"/><span class="temp"><span class="high"></span> <span class="low"></span></span></li>');
		
		el.find('.day').text( (i == 0) ? 'Today' : data.forecast[i].day );
		el.find('.icon').attr('src', data.forecast[i].icon);
		el.find('.high').html(data.forecast[i].high+'&deg;');
		el.find('.low').html(data.forecast[i].low+'&deg;');
		
		el.appendTo(this.element.find('.forecast'));
	}
};
