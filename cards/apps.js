var apps = card('apps');
apps.config.schema = {
	size: card.config.options('Icon size', {
		32: 'Small',
		64: 'Medium',
		128: 'Large'
	}),
	showText: card.config.bool('App names'),
	columns: card.config.number('Columns', 1, 10)
};
apps.config.default = {
	size: 64,
	showText: true,
	columns: 4
};

apps.prototype.controller = function(callback){
	var out = {apps: []};
	var self = this;
	chrome.management.getAll(function(apps){
		for (var i in apps) {
			if (!apps[i].isApp) continue;
			
			var icon;
			for (var i2 in apps[i].icons) {
				if (apps[i].icons[i2].size >= self.config.size) {
					icon = apps[i].icons[i2].url;
					break;
				}
			}
			if (!icon) {
				for (var i2 in apps[i].icons) {
					if (apps[i].icons[i2].size < self.config.size) {
						icon = apps[i].icons[i2].url;
					} else break;
				}
			}
			out.apps.push({
				id: apps[i].id,
				name: apps[i].name,
				icon: icon,
				description: apps[i].description,
				url: apps[i].appLaunchUrl
			});
		}
		callback && callback(out);
	});
};
apps.prototype.view = function(data){
	var appList = $('<div></div>');
	
	for (var i in data.apps) {
		var listItem = $('<a class="app"><img class="icon" alt=""/><span class="appname"></span></a>');
		
		listItem.css('width', (100/this.config.columns)+'%');
		
		listItem.attr('href', data.apps[i].url);
		listItem.attr('title', data.apps[i].description);
		
		listItem.find('.icon').attr('src', data.apps[i].icon);
		listItem.find('.icon').css({
			'max-height': this.config.size,
			'max-width': this.config.size
		});
		if (this.config.showText) {
			listItem.find('.appname').text(data.apps[i].name);
		}
		
		listItem.appendTo(appList);
	}
	
	appList.appendTo(this.element);
};
