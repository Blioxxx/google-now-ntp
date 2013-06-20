var apps = card('apps');
apps.config.schema = {
	size: new card.config.options('Icon size', {
		32: 'Small',
		64: 'Medium',
		128: 'Large'
	}),
	showText: new card.config.bool('App names'),
	columns: new card.config.number('Columns', 1, 10)
};
apps.config.default = {
	size: 64,
	showText: true,
	columns: 5
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
		console.log(data.apps[i].icon);
		listItem.find('.icon').css({
			maxHeight: this.config.size+'px',
			maxWidth: this.config.size+'px'
		});
		if (this.config.showText) {
			listItem.find('.appname').text(data.apps[i].name);
		}
		
		listItem.appendTo(appList);
	}
	
	this.element.html(appList);
};
