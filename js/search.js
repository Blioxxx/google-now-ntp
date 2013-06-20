$('#search').on('webkitspeechchange', function(){
	$('header form').submit();
});

$('header').on('click', function(){
	$('#search').focus();
});

var header = {
	status: 'down',
	up: function(){
		if (this.status == 'down') {
			this.status = 'up';
			$('#scrollbox').animate({translate3d: '0,-'+($('header').height()-79)+'px,0'}, 800, 'ease');
		}
	},
	down: function(){
		if (this.status == 'up') {
			this.status = 'down';
			$('#scrollbox').animate({translate3d: '0,0,0'}, 800, 'ease');
		}
	}
};

var lastQuery = '';
$('#search').on('keydown', function(e){
	var active = $('.card.suggestions ul li.active');
	if (e.which == 9) {
		//tab!
		if ($('#search').val() == $('.card.suggestions').attr('data-query')) {
			var first = $('.card.suggestions ul li').first();
			if (first) {
				$('#search').val(first.text()+' ');
			}
		}
		return false;
	} else if (e.which == 38) {
		//up
		console.log('up');
		if (active.length) {
			var newActive = active.prev();
			newActive.addClass('active');
			active.removeClass('active');
			active = newActive;
		}
		if (active.length) {
			$('#search').val(active.text());
		} else {
			$('#search').val($('.card.suggestions').attr('data-query'));
		}
		return false;
	} else if (e.which == 40) {
		//down
		console.log('down');
		if (active.length) {
			var newActive = active.next();
			newActive.addClass('active');
			active.removeClass('active');
			active = newActive;
		}
		if (!active.length) {
			$('.card.suggestions ul li').first().addClass('active');
		}
		if (active.length) {
			$('#search').val(active.text());
		}
		return false;
	}
});
$('#search').on('keyup', function(e){
	if (e.which == 38 || e.which == 40) return false;
	var query = $(this).val();
	
	if (query == lastQuery) return;
	lastQuery = query;
	
	if (query.length) {
		//header.up();
	} else {
		//header.down();
		$('.card.suggestions').hide();
		return;
	}
	
	$.getJSON('https://encrypted.google.com/s?callback=?', {'q': query}, function(data){
		if (data[0] == $('#search').val()) {
			var list = data[1].slice(0, 5);
			if (!list.length) {
				$('.card.suggestions ul').html('');
				$('.card.suggestions').hide();
				return;
			}
			$('.card.suggestions ul').html('');
			for (var i in list) {
				var item = list[i][0];
				$('<li></li>').text(item).appendTo('.card.suggestions ul');
			}
			$('.card.suggestions').attr('data-query', data[0]).show();
		}
	});
});

$('.card.suggestions').on('click', 'li', function(){
	$('#search').val($(this).text());
	$('header form').submit();
});
