var makeMenu = function(parent, id, callback){
	if (!id) id = "1";
	$(parent).attr('data-id', id);
	chrome.bookmarks.getSubTree(id, function(data){
		var list = data[0].children;
		for (var i in list) {
			var el = $('<li><a class="link"><img class="favicon" alt=""/><span class="title"></span></a></li>');
		
			el.find('.link').attr({
				'href': list[i].url,
				'data-id': list[i].id
			});
			if (typeof list[i].children != 'undefined') {
				el.find('.link').addClass('folder')
					.on('click', function(){
						if ($('.submenu[data-id="'+$(this).attr('data-id')+'"]').length) return false;
						var newMenu = $('<ul class="submenu"></ul>');
						newMenu.attr('data-parent', id);
						if ($(parent).hasClass('bookmarksbar')) {
							var totalWidth = 0;
							$(parent).children().each(function(){
								totalWidth += $(this).width();
							});
							newMenu.css({
								top: 26,
								left: $(this).position().left
							});
						} else {
							var totalHeight = 26;
							$(parent).children().each(function(){
								totalHeight += $(this).height();
							});
							newMenu.css({
								top: $(this).position().top+$(parent).position().top,
								left: $(parent).position().left+$(this).outerWidth()
							});
						}
						makeMenu(newMenu, $(this).attr('data-id'), function(){
							newMenu.appendTo('body');
						});
						return false;
					});
			}
			el.find('.link').on('mouseenter', function(){
				var exceptions = {};
				var exceptParents = function(el){
					if (el.hasClass('link')) {
						exceptParents(el.parent().parent());
					} else if (el.hasClass('submenu')) {
						exceptions[el.attr('data-id')] = true;
						exceptParents( $('.submenu[data-id="'+el.attr('data-parent')+'"]') );
					}
				}
				var exceptChildren = function(el){
					if (el.hasClass('link')) {
						exceptChildren( $('.submenu[data-id="'+el.attr('data-id')+'"]') );
					} else if (el.hasClass('submenu')) {
						exceptions[el.attr('data-id')] = true;
						exceptChildren( $('.submenu[data-parent="'+el.attr('data-id')+'"]') );
					}
				};
				exceptParents($(this));
				exceptChildren($(this));
				$('.submenu').each(function(){
					if (!exceptions[$(this).attr('data-id')]) $(this).remove();
				});
			});
			
			var icon = (typeof list[i].children == 'undefined') ? 'chrome://favicon/'+list[i].url : 'folder.png';
			el.find('.favicon').attr('src', icon);
			el.find('.title').text( (list[i].title) ? ' '+list[i].title : '' );
		
			el.appendTo(parent);
		}
		callback && callback();
	});
};

makeMenu('.bookmarksbar');

$('body').on('click', function(){
	$('.submenu').remove();
});
