$('#search').on('webkitspeechchange', function(){
	$('header form').submit();
});

$('header').on('click', function(){
	$('#search').focus();
});

var lastQuery = '';
$('#search').on('keyup', function(){
	var query = $(this).val();
	
	if (query == lastQuery) return;
	lastQuery = query;
	
	if (query.length) {
		header.up();
	} else {
		header.down();
		$('.card.suggestions').hide();
		return;
	}
	
	$.getJSON('https://encrypted.google.com/s?callback=?', {'q': query}, function(data){
		if (data[0] == $('#search').val()) {
			var list = data[1].slice(0, 5);
			if (!list.length) {
				$('.card.suggestions').hide();
				return;
			}
			$('.card.suggestions ul').html('');
			for (var i in list) {
				var item = list[i][0];
				$('<li></li>').text(item).appendTo('.card.suggestions ul');
			}
			$('.card.suggestions').show();
		}
	});
});

$('.card.suggestions').on('click', 'li', function(){
	$('#search').val($(this).text());
	$('header form').submit();
});

var header = {
	status: 'down',
	up: function(){
		if (this.status == 'down') {
			this.status = 'up';
			$('#scrollbox').animate({translate3d: '0,-'+($('header').height()-79)+'px,0'}, 800, 'ease');
			$('.columns').animate({opacity: 0}, 600, 'ease');
		}
	},
	down: function(){
		if (this.status == 'up') {
			this.status = 'down';
			$('#scrollbox').animate({translate3d: '0,0,0'}, 800, 'ease');
			$('.columns').animate({opacity: 1}, 600, 'ease');
		}
	}
};

window.cards = {};

var makeCard = function(type, parent){
	cards[type](function(html){
		var el = $(html);
		el.appendTo(parent);
		el.css({
			display: 'block'
		}).animate({
			translate3d: '0,0,0'
		}, 800, 'ease');
	});
};
