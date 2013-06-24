/*chrome.bookmarks.getSubTree("1", function(data){
	var list = data[0].children;
	for (var i in list) {
		var el = $('<li><a class="link"><img class="favicon" alt=""/><span class="title"></span></a></li>');
		
		el.find('.link').attr('href', list[i].url);
		var icon = (typeof list[i].children == 'undefined') ? 'chrome://favicon/'+list[i].url : 'folder.png';
		el.find('.favicon').attr('src', icon);
		el.find('.title').text( (list[i].title) ? ' '+list[i].title : '' );
		
		el.appendTo('.bookmarksbar');
	}
});*/
