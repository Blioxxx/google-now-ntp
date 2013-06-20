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
		favicon: tab.favIconUrl,
		url: tab.url
	};
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	if (tabs[tabId]) {
		recentlyClosed.unshift(tabs[tabId]);
		if (recentlyClosed.length == 11) {
			recentlyClosed.pop();
		}
		delete tabs[tabId];
	}
});
