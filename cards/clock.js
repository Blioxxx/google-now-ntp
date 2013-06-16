window.cards.clock = function(ready){
	var card = $('<article class="card clock">'+
		'<h2><span class="hours">6</span><span class="firstcolon">:</span><span class="minutes">24</span><span class="secondcolon">:</span><span class="seconds">39</span> <span class="ampm">pm</span></h2>'+
		'<h3><span class="dayname">Friday</span><span class="comma">,</span> <span class="month">June</span> <span class="date">15</span><span class="datesuffix">th</span> <span class="year">2013</span></h3>'+
		'</article>');
	var updateTime = function(){
		var now = new Date();
		
		card.find('.hours').text(now.getHours()%12 || 12);
		
		var minutes = now.getMinutes();
		if (minutes < 10) minutes = '0'+minutes;
		card.find('.minutes').text(minutes);
		
		var seconds = now.getSeconds();
		if (seconds < 10) seconds = '0'+seconds;
		card.find('.seconds').text(seconds);
		
		card.find('.ampm').text( (now.getHours() < 12) ? 'am' : 'pm' );
		
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		card.find('.dayname').text(days[now.getDay()]);
		
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		card.find('.month').text(months[now.getMonth()]);
		
		var date = now.getDate();
		card.find('.date').text(date);
		
		var suffix;
		var suffixes = {1: 'st', 2: 'nd', 3: 'rd'};
		if (date > 10 && date < 20) {
			suffix = 'th';
		} else {
			var lastNumber = (date+'').slice(-1)*1;
			suffix = suffixes[lastNumber] || 'th';
		}
		card.find('.datesuffix').text(suffix);
		
		card.find('.year').text(now.getFullYear());
	};
	updateTime();
	setInterval(updateTime, 1000);
	ready(card);
};

makeCard('clock', '.leftColumn');
