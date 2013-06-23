$('#globalbuttons .defaultntp').click(function(){
	chrome.tabs.update({url:"chrome-internal://newtab/"});
});

$('.trash').sortable();

$('.column').sortable({
	connectWith: '.column, .trash',
	placeholder: 'cardplaceholder',
	forcePlaceholderSize: true,
	revert: 200,
	scrollSpeed: 5,
	distance: 10,
	cancel: '.nodrag',
	tolerance: 'cursor',
	update: function(){
		config.layout = {};
		$('.card').trigger('moved');
	},
	start: function(){
		$('.trash').addClass('visible');
	},
	stop: function(){
		$('.trash').removeClass('visible');
	}
});
