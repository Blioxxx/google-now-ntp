var recent = card('recent');
recent.config.schema = {};
recent.config.default = {};

recent.prototype.controller = function(callback){
	callback && callback(chrome.extension.getBackgroundPage().recentlyClosed.slice(0, 4));
};

recent.prototype.view = function(list){
	this.element.html('');
	for (var i in list) {
		var thumb = $('<a><span class="thumbbox"><img class="favicon" src="" alt=""/></span><span class="sitename"></span></a>');
		thumb.find('.favicon').attr('src', list[i].favicon);
		thumb.find('.sitename').text(list[i].title);
		thumb.attr('href', list[i].url);
		thumb.appendTo(this.element);
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
