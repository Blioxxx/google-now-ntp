var googleservices = card('googleservices');
googleservices.config.schema = {};
googleservices.config.default = {};

var services = [
	['gplus', 'https://plus.google.com/', 'Google+'],
	['googlemail', 'https://mail.google.com/', 'Gmail'],
	['maps', 'https://www.google.com/maps', 'Maps'],
	['drive', 'https://drive.google.com/', 'Drive'],
	['calendar', 'https://www.google.com/calendar/', 'Calendar'],
	['youtube', 'https://www.youtube.com/', 'Youtube'],
	['photos', 'https://plus.google.com/photos', 'Google+ Photos'],
	['music', 'https://play.google.com/music', 'Music'],
	['wallet', 'https://wallet.google.com/', 'Wallet'],
	['voice', 'https://www.google.com/voice', 'Voice'],
	['finance', 'https://www.google.com/finance', 'Finance'],
	['translate', 'https://translate.google.com/', 'Translate']
];

googleservices.prototype.controller = function(callback){
	var out = {icons: []};
	for (var i in services) {
		out.icons.push({
			url: services[i][1],
			icon: 'icons/'+services[i][0]+'-32.png',
			name: services[i][2]
		});
	}
	callback && callback(out);
};

googleservices.prototype.view = function(data){
	this.element.html('');
	for (var i in data.icons) {
		var service = $('<a><img/></a>');
		service.attr('href', data.icons[i].url);
		service.attr('title', data.icons[i].name);
		service.find('img').attr('src', data.icons[i].icon);
		service.appendTo(this.element);
	}
};
