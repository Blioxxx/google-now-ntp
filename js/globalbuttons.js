$('#globalbuttons .defaultntp').click(function(){
	chrome.tabs.update({url:"chrome-internal://newtab/"});
});
$('#globalbuttons .bookmarks').click(function(){
	$('.bookmarksbar').toggle();
	config.bookmarks = !config.bookmarks;
	saveConfig();
});
$('#globalbuttons .reset').click(function(){
	if (confirm('This will reset this extension. Are you sure?')) {
		localStorage.clear();
		localStorage.version = version;
		document.location.reload();
	}
});
