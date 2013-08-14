var version;
var oldVersion = localStorage.version || '0';

var notify = function(html){
	$('#notification').html(html+'<div class="closebutton"><i class="icon-remove-sign"></i></div>')
		.show()
		.find('.closebutton').on('click', function(){
			$('#notification').hide();
		});
};

var allNewFeatures = function(){
	notify('<p>Welcome to version '+version+'! Organize your cards by dragging them.');
};
var newDragging = function(){
	notify('<p>Welcome to version '+version+'! You can now add a new column by dragging a card into an empty spot. You can also get rid of a column by removing all cards from it.</p>');
};
var upgradeCallbacks = {
	'0': allNewFeatures,
	'1.1.3': allNewFeatures,
	'1.1.3': allNewFeatures,
	'1.1.3': allNewFeatures,
	'1.2': allNewFeatures,
	'1.2.1': allNewFeatures,
	'1.2.2': allNewFeatures,
	'1.3.1': newDragging
};

$.getJSON('manifest.json', function(data){
	version = data.version;
	localStorage.version = version;
	
	if (oldVersion != version) {
		upgradeCallbacks[oldVersion] && upgradeCallbacks[oldVersion]();
	}
});
