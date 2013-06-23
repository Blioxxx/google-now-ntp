$('#globalbuttons .defaultntp').click(function(){
	chrome.tabs.update({url:"chrome-internal://newtab/"});
});
$('#globalbuttons .reset').click(function(){
	if (confirm('This will reset this extension. Are you sure?')) {
		localStorage.clear();
		localStorage.version = version;
		document.location.reload();
	}
});

$('.trash').sortable();

$('.column').sortable({
	connectWith: '.column, .trash',
	placeholder: 'cardplaceholder',
	forcePlaceholderSize: true,
	revert: 200,
	scrollSpeed: 5,
	distance: 10,
	delay: 150,
	cancel: '.nodrag, input, select',
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
