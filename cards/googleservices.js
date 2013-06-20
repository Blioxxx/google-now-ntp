var googleservices = card('googleservices');
googleservices.config.schema = {};
googleservices.config.default = {};

var services = [
	['gplus', 'https://plus.google.com/'],
	['googlemail', 'https://mail.google.com/'],
	['maps', 'https://www.google.com/maps'],
	['drive', 'https://drive.google.com/'],
	['calendar', 'https://www.google.com/calendar/'],
	['youtube', 'https://www.youtube.com/'],
	['photos', 'https://plus.google.com/photos'],
	['music', 'https://play.google.com/music'],
	['wallet', 'https://wallet.google.com/'],
	['voice', 'https://www.google.com/voice'],
	['finance', 'https://www.google.com/finance'],
	['translate', 'https://translate.google.com/']
];

googleservices.prototype.controller = function(callback){
	var out = {icons: []};
	for (var i in services) {
		out.icons.push({
			url: services[i][1],
			icon: 'icons/'+services[i][0]+'-32.png'
		});
	}
	callback && callback(out);
};

googleservices.prototype.view = function(data){
	this.element.html('');
	for (var i in data.icons) {
		var service = $('<a><img/></a>');
		service.attr('href', data.icons[i].url);
		service.find('img').attr('src', data.icons[i].icon);
		service.appendTo(this.element);
	}
};
