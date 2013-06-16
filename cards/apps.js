window.cards.apps = function(ready){
	var card = $('<article class="card apps"><ul></ul></article>');
	card.on('click', '.app', function(){
		chrome.management.launchApp($(this).attr('data-id'));
	});
	chrome.management.getAll(function(apps){
		for (var i in apps) {
			if (!apps[i].isApp) continue;
			var el = $('<li class="app"><img class="icon" alt=""/><span class="appname"></span></li>');
			el.attr('data-id', apps[i].id);
			el.attr('title', apps[i].description);
			
			var icon;
			for (var i2 in apps[i].icons) {
				if (apps[i].icons[i2].size >= 64) {
					icon = apps[i].icons[i2].url;
					break;
				}
			}
			if (!icon) {
				for (var i2 in apps[i].icons) {
					if (apps[i].icons[i2].size < 64) {
						icon = apps[i].icons[i2].url;
					} else break;
				}
			}
			
			el.find('.icon').attr('src', icon);
			el.find('.appname').text(apps[i].name);
			el.appendTo(card.find('ul'));
		}
		ready(card);
	});
};

makeCard('apps', '.leftColumn');
