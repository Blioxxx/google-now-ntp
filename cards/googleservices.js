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

window.cards.googleservices = function(ready){
	var card = $('<article class="card googleservices"></article>');
	for (var i in services) {
		var service = $('<a><img/></a>');
		service.attr('href', services[i][1]);
		service.find('img').attr('src', '../icons/'+services[i][0]+'-32.png');
		service.appendTo(card);
	}
	ready(card);
};

makeCard('googleservices', '.rightColumn');
