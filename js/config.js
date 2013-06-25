var config = {
	layout: {
		1: [{card: 'googleservices'}, {card: 'apps'}, {card: 'topsites'}, {card: 'recent'}],
		2: [{card: 'clock'}, {card: 'weather'}]
	},
	bookmarks: false
};

if (localStorage.config) {
	config = JSON.parse(localStorage.config);
}

var saveConfig = function(){
	localStorage.config = JSON.stringify(config);
};
