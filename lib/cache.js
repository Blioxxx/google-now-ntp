var cache = {
	prefix: 'cache_',
	get: function(key){
		var item = localStorage[this.prefix+key];
		if (!item) return undefined;
		item = JSON.parse(item);
		if (item.expires < (new Date()).getTime()) {
			delete localStorage[this.prefix+key];
			return undefined;
		}
		return item.value;
	},
	set: function(key, value, ttl){
		localStorage[this.prefix+key] = JSON.stringify({
			value: value,
			expires: (new Date()).getTime()+ttl
		});
	},
	remove: function(key){
		delete localStorage[this.prefix+key];
	}
};
