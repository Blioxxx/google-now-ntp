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

window.cards.weather = function(ready){
	var card = $('<article class="card weather">'+
		'<h2 class="location"></h2>'+
		'<img class="current_icon" src="https://ssl.gstatic.com/onebox/weather/128/sunny.png" alt=""/>'+
		'<div class="current_text">'+
			'<p class="current_temperature"></p>'+
			'<p class="current_conditions"></p>'+
		'</div><div style="clear:both"></div>'+
		'<ul class="forecast"></ul>'+
		'<div style="clear:both"></div></article>');
	
	$.getJSON('https://api.wunderground.com/api/'+apiKey+'/conditions/q/VT/Burlington.json?callback=?', function(data){
		var current = data.current_observation;
		card.find('.current_temperature').html(Math.round(current.temp_f)+'&deg;');
		card.find('.location').text(current.display_location.full);
		card.find('.current_icon').attr('src', 'https://ssl.gstatic.com/onebox/weather/128/'+icons[current.icon]+'.png');
		card.find('.current_conditions').text(current.weather);
		ready(card);
	});
	
	$.getJSON('https://api.wunderground.com/api/'+apiKey+'/forecast/q/VT/Burlington.json?callback=?', function(data){
		var forecast = data.forecast.simpleforecast.forecastday;
		for (var i in forecast) {
			var el = $('<li><span class="day"></span><img alt="" class="icon"/><span class="temp"><span class="high"></span> <span class="low"></span></span></li>');
			
			el.find('.day').text( (i == 0) ? 'Today' : forecast[i].date.weekday_short );
			el.find('.icon').attr('src', 'https://ssl.gstatic.com/onebox/weather/64/'+icons[forecast[i].icon]+'.png');
			el.find('.high').html(forecast[i].high.fahrenheit+'&deg;');
			el.find('.low').html(forecast[i].low.fahrenheit+'&deg;');
			
			el.appendTo(card.find('.forecast'));
		}
	});
};

makeCard('weather', '.rightColumn');
