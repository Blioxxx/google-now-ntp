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

var apiKey = 'bd97a519af0b8fc3e6c9630594847c31';

var icons = {
	'01': 'sunny',
	'02': 'sunny_s_cloudy',
	'03': 'cloudy_s_sunny',
	'04': 'partly_cloudy',
	'09': 'cloudy_s_rain',
	'10': 'rain',
	'11': 'thunderstorms',
	'13': 'snow',
	'50': 'fog'
};
var conditions = {
	611: 'sleet',
	701: 'mist',
	741: 'fog',
	804: 'cloudy',
	905: 'windy',
	300: 'rain_s_cloudy'
};
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

weather.prototype.getLocation = function(callback){
	if (this.config.location != 'automatic') {
		callback(this.config.location);
	} else {
		getLocation(function(loc){
			callback({lat: loc.lat, lon: loc.lon});
		});
	}
};

weather.prototype.ktof = function(kelvin){
	return ((kelvin - 273.15) * 1.8) + 32;
};
weather.prototype.ktoc = function(kelvin){
	return kelvin - 273.15;
};

weather.prototype.controller = function(callback){
	var self = this;
	this.getLocation(function(loc){
		var out = {};
		
		var finished = 0;
		
		var locString;
		if (typeof loc == 'string') {
			locString = 'q='+loc;
		} else {
			locString = 'lat='+loc.lat+'&lon='+loc.lon;
		}
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?'+locString, function(data){
			var icon = icons[data.weather[0].icon.substr(0, 2)];
			if (conditions[data.weather[0].id]) {
				icon = conditions[data.weather[0].id];
			}
			out.current = {
				temperature: {
					f: Math.round( self.ktof(data.main.temp) ),
					c: Math.round( self.ktoc(data.main.temp) )
				},
				location: data.name,
				icon: 'https://ssl.gstatic.com/onebox/weather/128/'+icon+'.png',
				conditions: data.weather[0].description
			};
			
			finished++;
			if (finished == 2) callback && callback(out);
		});
		
		$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?cnt=4&'+locString, function(data){
			var forecast = data.list;
			out.forecast = [];
			for (var i in forecast) {
				var now = (new Date()).getTime();
				var day = days[(new Date(now+(1000 * 60 * 60 * 24 * i))).getDay()];
				var icon = icons[forecast[i].weather[0].icon.substr(0, 2)];
				if (conditions[forecast[i].weather[0].id]) {
					icon = conditions[forecast[i].weather[0].id];
				}
				out.forecast.push({
					day: (i == 0) ? 'Today' : day,
					conditions: forecast[i].weather[0].description,
					icon: 'https://ssl.gstatic.com/onebox/weather/64/'+icon+'.png',
					high: {
						f: Math.round( self.ktof(forecast[i].temp.max) ),
						c: Math.round( self.ktoc(forecast[i].temp.max) )
					},
					low: {
						f: Math.round( self.ktof(forecast[i].temp.min) ),
						c: Math.round( self.ktoc(forecast[i].temp.min) )
					}
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
	this.element.find('.current_temperature').html(data.current.temperature[this.config.units]+'&deg;');
	this.element.find('.location').text(data.current.location);
	this.element.find('.current_icon').attr('src', data.current.icon);
	this.element.find('.current_conditions').text(data.current.conditions);
	
	this.element.find('.forecast').html('');
	for (var i in data.forecast) {
		var el = $('<li><span class="day"></span><img alt="" class="icon"/><span class="temp"><span class="high"></span> <span class="low"></span></span></li>');
		
		el.attr('title', data.forecast[i].conditions);
		el.find('.day').text( (i == 0) ? 'Today' : data.forecast[i].day );
		el.find('.icon').attr('src', data.forecast[i].icon);
		el.find('.high').html(data.forecast[i].high[this.config.units]+'&deg;');
		el.find('.low').html(data.forecast[i].low[this.config.units]+'&deg;');
		
		el.appendTo(this.element.find('.forecast'));
	}
};
