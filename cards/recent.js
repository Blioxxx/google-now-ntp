var recent = card('recent');
recent.config.schema = {};
recent.config.default = {};

var lastClosedTabs = 0;
recent.prototype.controller = function(callback){
	if (lastClosedTabs != chrome.extension.getBackgroundPage().numberOfClosedTabs) {
		lastClosedTabs = chrome.extension.getBackgroundPage().numberOfClosedTabs;
		callback && callback(chrome.extension.getBackgroundPage().recentlyClosed.slice(0, 4));
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

recent.prototype.destroy = function(){
	if (this.nextRefresh) {
		clearTimeout(this.nextRefresh);
	}
};

recent.prototype.view = function(list){
	this.element.html('');
	for (var i in list) {
		var thumb = $('<a><span class="thumbbox"><img class="favicon" src="" alt=""/></span><span class="sitename"></span></a>');
		var icon = list[i].favicon || 'chrome://favicon/'+list[i].url;
		thumb.find('.favicon').attr('src', icon);
		thumb.find('.sitename').text(list[i].title);
		thumb.attr('href', list[i].url);
		thumb.appendTo(this.element);
	}
	
	if (!list) {
		this.parent.hide();
	} else {
		this.parent.show();
	}
};
