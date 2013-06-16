window.cards.topsites = function(ready){
	var card = $('<article class="card topsites"></article>');
	chrome.topSites.get(function(sites){
		sites = sites.slice(0, 8);
		for (var i in sites) {
			var thumb = $('<a><span class="thumbbox"><img class="favicon" src="" alt=""/></span><span class="sitename"></span></a>');
			thumb.find('.favicon').attr('src', 'chrome://favicon/'+sites[i].url);
			thumb.find('.sitename').text(sites[i].title);
			thumb.attr('href', sites[i].url);
			card.append(thumb);
		}
		ready(card);
	});
};

makeCard('topsites', '.leftColumn');
