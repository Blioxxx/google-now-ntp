var topsites = card('topsites');
topsites.config.schema = {};
topsites.config.default = {};

topsites.prototype.controller = function(callback){
	var out = {sites: []};
	chrome.topSites.get(function(sites){
		sites = sites.slice(0, 8);
		for (var i in sites) {
			out.sites.push({
				favicon: 'chrome://favicon/'+sites[i].url,
				title: sites[i].title,
				url: sites[i].url
			});
		}
		callback && callback(out);
	});
};

topsites.prototype.view = function(data){
	this.element.html('');
	for (var i in data.sites) {
		var thumb = $('<a><span class="thumbbox"><img class="favicon" src="" alt=""/></span><span class="sitename"></span></a>');
		thumb.find('.favicon').attr('src', 'chrome://favicon/'+data.sites[i].url);
		thumb.find('.sitename').text(data.sites[i].title);
		thumb.attr('href', data.sites[i].url);
		thumb.appendTo(this.element);
	}
};
