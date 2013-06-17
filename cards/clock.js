var clock = card('clock');

clock.config.schema = {
	showSeconds: card.config.bool('Show seconds'),
	showDate: card.config.bool('Show date'),
	'24hour': card.config.bool('24 hour')
};
clock.config.default = {
	showSeconds: true,
	showDate: true,
	'24hour': false
};

clock.prototype.controller = function(callback){
	var out = {};
	var now = new Date();
	
	out.hours = now.getHours()%12 || 12;
	
	var minutes = now.getMinutes();
	if (minutes < 10) minutes = '0'+minutes;
	out.minutes = minutes;
	
	var seconds = now.getSeconds();
	if (seconds < 10) seconds = '0'+seconds;
	out.seconds = seconds;
	
	out.ampm = (now.getHours() < 12) ? 'am' : 'pm';
	
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	out.dayname = days[now.getDay()];
	
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	out.month = months[now.getMonth()];
	
	var date = now.getDate();
	out.date = date;
	
	var suffix;
	var suffixes = {1: 'st', 2: 'nd', 3: 'rd'};
	if (date > 10 && date < 20) {
		suffix = 'th';
	} else {
		var lastNumber = (date+'').slice(-1)*1;
		suffix = suffixes[lastNumber] || 'th';
	}
	out.datesuffix = suffix;
	
	out.year = now.getFullYear();
	
	callback && callback(out);
};

clock.prototype.setup = function(){
	this.element.html('<h2><span class="hours">6</span><span class="firstcolon">:</span><span class="minutes">24</span><span class="secondcolon">:</span><span class="seconds">39</span> <span class="ampm">pm</span></h2><h3><span class="dayname">Friday</span><span class="comma">,</span> <span class="month">June</span> <span class="date">15</span><span class="datesuffix">th</span> <span class="year">2013</span></h3>');
};

clock.prototype.view = function(data){
	this.element.find('.hours').text(data.hours);
	this.element.find('.minutes').text(data.minutes);
	this.element.find('.seconds').text(data.seconds);
	this.element.find('.ampm').text(data.ampm);
	this.element.find('.dayname').text(data.dayname);
	this.element.find('.month').text(data.month);
	this.element.find('.date').text(data.date);
	this.element.find('.datesuffix').text(data.datesuffix);
	this.element.find('.year').text(data.year);
	
	var self = this;
	setTimeout(function(){
		if (self && self.element) {
			self.run();
		}
	}, 1000);
};
