var clock = card('clock');

clock.config.schema = {
	showSeconds: new card.config.bool('Show seconds'),
	showDate: new card.config.bool('Show date'),
	showColons: new card.config.bool('Show colons'),
	'24hour': new card.config.bool('24 hour')
};
clock.config.default = {
	showSeconds: false,
	showDate: true,
	showColons: false,
	'24hour': false
};

clock.prototype.controller = function(callback){
	var out = {};
	var now = new Date();
	
	out.hours = now.getHours();
	if (!this.config['24hour']) {
		out.hours = out.hours%12 || 12;
	}
	
	var minutes = now.getMinutes();
	if (minutes < 10) minutes = '0'+minutes;
	out.minutes = minutes;
	
	if (this.config.showSeconds) {
		var seconds = now.getSeconds();
		if (seconds < 10) seconds = '0'+seconds;
		out.seconds = seconds;
	} else {
		out.seconds = '';
	}
	
	if (this.config['24hour']) {
		out.ampm = '';
	} else {
		out.ampm = (now.getHours() < 12) ? 'am' : 'pm';
	}
	
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
	this.element.html('<h3><span class="hours"></span><span class="firstcolon">:</span><span class="minutes"></span><span class="secondcolon">:</span><span class="seconds"></span> <span class="ampm"></span></h3><h4><span class="dayname"></span><span class="comma">,</span> <span class="month"></span> <span class="date"></span><span class="datesuffix"></span> <span class="year"></span></h4>');
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
	
	if (this.config.showColons) {
		this.element.find('.firstcolon, .secondcolon').css('color', 'inherit');
	} else {
		this.element.find('.firstcolon, .secondcolon').css('color', 'transparent');
	}
	
	if (this.config.showSeconds) {
		this.element.find('.secondcolon').show();
	} else {
		this.element.find('.secondcolon').hide();
	}
	
	if (this.config.showDate) {
		this.element.find('h3').show();
	} else {
		this.element.find('h3').hide();
	}
	
	var self = this;
	if (this.nextRefresh) {
		clearTimeout(this.nextRefresh);
	}
	this.nextRefresh = setTimeout(function(){
		if (self && self.element) {
			self.run();
		}
	}, 1000);
};
