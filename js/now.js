var config = {
	headerHeight: 180,
	columns: 2,
	width: 70,
	layout: {
		1: [{card: 'apps', columns: 5, showText: false}, {card: 'googleservices'}, {card: 'topsites'}],
		2: [{card: 'clock'}, {card: 'weather'}],
	}
};

$('.columns').css('width', config.width+'%');

for (var i = 1; i <= config.columns; i++) {
	var column = $('<div class="column" data-id="'+i+'"></div>');
	column.appendTo('.columns');
	
	column.css('width', (100/config.columns)+'%');
}

for (var columnID in config.layout) {
	for (var i in config.layout[columnID]) {
		var cardName = config.layout[columnID][i].card;
		var options = {};
		for (var attribute in config.layout[columnID][i]) {
			if (attribute != 'card') {
				options[attribute] = config.layout[columnID][i][attribute];
			}
		}
		var newCard = new cards[cardName]();
		console.log(newCard);
		newCard.setConfig(options);
		newCard.setup();
		(function(cid){
			newCard.run(function(){
				this.show('.column[data-id="'+cid+'"]');
			});
		})(columnID);
	}
}
