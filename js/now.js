$('.trash').sortable();

var makeColumnSortable = function(col){
	col.sortable({
		connectWith: '.column, .trash, .newcolumn',
		placeholder: 'cardplaceholder',
		forcePlaceholderSize: true,
		revert: 200,
		scrollSpeed: 5,
		distance: 10,
		delay: 150,
		cancel: '.nodrag, input, select',
		tolerance: 'cursor',
		update: function(){
			for (var i in config.layout) {
				config.layout[i] = [];
			}
			$('.card').trigger('moved');
			for (var i in config.layout) {
				console.log(config.layout[i]);
				if (!config.layout[i].length) {
					delete config.layout[i];
					removeColumn(i);
				}
			}
			saveConfig();
			sizeColumns();
		},
		start: function(){
			$('.trash').addClass('visible');
		},
		stop: function(){
			$('.trash').removeClass('visible');
		}
	});
};

var addColumn = function(newColumn){
	var el = $('<div class="column" data-id="'+newColumn+'"></div>');
	if (newColumn == 1) {
		el.insertAfter('.columns .newcolumn.left');
		$('.columns .newcolumn.left').children().appendTo(el);
	} else {
		el.insertBefore('.columns .newcolumn.right');
		$('.columns .newcolumn.right').children().appendTo(el);
	}
	makeColumnSortable(el);
};
var removeColumn = function(id){
	$('.column[data-id="'+id+'"]').remove();
	var found = false;
	for (var i in config.layout) {
		if (i > id) {
			found = i;
			config.layout[i-1] = config.layout[i];
			$('.column[data-id="'+i+'"]').attr('data-id', i-1);
		}
	}
	if (found) {
		delete config.layout[found];
	}
};
var sizeColumns = function(create){
	var numberOfColumns = Object.keys(config.layout).length;
	
	var pageWidth;
	if (numberOfColumns == 1) {
		pageWidth = 40;
	} else if (numberOfColumns == 2) {
		pageWidth = 70;
	} else {
		pageWidth = 100;
	}
	
	if (create) {
		$('.columns').append('<div class="newcolumn left"></div>');
		for (var i = 1; i <= numberOfColumns; i++) {
			var column = $('<div class="column" data-id="'+i+'"></div>');
			column.appendTo('.columns');
		}
		$('.columns').append('<div class="newcolumn right"></div>');
		$('.columns').append('<br style="clear:both">');
		$('.newcolumn').sortable();
	}
	
	$('.column').css('width', (pageWidth/numberOfColumns)+'%');
	$('.newcolumn').css('width', (pageWidth/numberOfColumns)+'%');
	$('.newcolumn.left').css('margin-left', (((100-pageWidth)/2)-(pageWidth/numberOfColumns))+'%');
	$('.newcolumn.right').css('margin-right', (((100-pageWidth)/2)-(pageWidth/numberOfColumns))+'%');
};

sizeColumns(true);

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

makeColumnSortable($('.column'));

$('body').on('keypress', function(e){
	if (e.which == 13) {
		$('.card.flipped .unconfigbutton').click();
		if ($('#search').val() == '') {
			return false;
		}
	}
});
