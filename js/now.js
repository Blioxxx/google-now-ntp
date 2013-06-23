var numberOfColumns = Object.keys(config.layout).length;

var pageWidth;
if (numberOfColumns == 1) {
	pageWidth = 40;
} else if (numberOfColumns == 2) {
	pageWidth = 70;
} else {
	pageWidth = 100;
}

$('.columns').css('width', pageWidth+'%');

for (var i = 1; i <= numberOfColumns; i++) {
	var column = $('<div class="column" data-id="'+i+'"></div>');
	column.appendTo('.columns');
	
	column.css('width', (100/numberOfColumns)+'%');
}
$('.columns').append('<br style="clear:both">');

for (var columnID in config.layout) {
	for (var i in config.layout[columnID]) {
		var cardName = config.layout[columnID][i].card;
		var options = {};
		for (var attribute in config.layout[columnID][i]) {
			if (attribute != 'card') {
				options[attribute] = config.layout[columnID][i][attribute];
			}
		}
		var newCard = new cards[cardName](columnID, i);
		newCard.setConfig(options);
		newCard.setup();
		newCard.show('.column[data-id="'+columnID+'"]');
		newCard.run(function(){
			this.parent.show();
		});
	}
}

$('body').on('keypress', function(e){
	if (e.which == 13) {
		$('.card.flipped .unconfigbutton').click();
		return false;
	}
});
