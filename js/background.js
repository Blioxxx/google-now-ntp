var tabs = {};
window.recentlyClosed = [];
var watchedProtocols = {
	'http': true,
	'https': true
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if (!watchedProtocols[tab.url.split('://')[0]]) return;
	tabs[tabId] = {
		title: tab.title,
		favicon: tab.favIconUrl
	};
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	if (tabs[tabId]) {
		recentlyClosed.push(tabs[tabId]);
		if (recentlyClosed.length == 11) {
			recentlyClosed.shift();
		}
		delete tabs[tabId];
	}
});
