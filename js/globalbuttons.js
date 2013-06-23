$('#globalbuttons .defaultntp').click(function(){
	chrome.tabs.update({url:"chrome-internal://newtab/"});
});

$('.column').sortable({
	connectWith: '.column',
	placeholder: 'cardplaceholder',
	forcePlaceholderSize: true,
	revert: 200,
	scrollSpeed: 5,
	update: function(){
		config.layout = {};
		$('.card').trigger('moved');
	}
});
