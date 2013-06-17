var cards = {};

var card = function(cardName){
	var newCard = function(){
		this.element = $('<article class="card '+cardName+'"></article>');
		this.config = newCard.config.default;
	};
	newCard.config = {
		schema: {},
		default: {}
	};
	newCard.description = 'The author has not yet written a description for this card.';
	newCard.author = 'Tristan Davies';
	newCard.prototype.setConfig = function(conf){
		this.config = {};
		for (var i in newCard.config.default) {
			this.config[i] = newCard.config.default[i];
		}
		for (var i in conf) {
			this.config[i] = conf[i];
		}
	};
	newCard.prototype.view = function(data){
		this.element.text('<p>No render function has been added to this card :(</p>');
	};
	newCard.prototype.controller = function(callback){
		callback && callback({});
	};
	newCard.prototype.show = function(parent){
		this.element.appendTo(parent);
		this.element.css({
			display: 'block'
		}).animate({
			translate3d: '0,0,0'
		}, 800, 'ease');
	};
	newCard.prototype.setup = function(){};
	newCard.prototype.run = function(callback){
		var self = this;
		this.controller(function(data){
			self.view(data);
			callback && callback.apply(self);
		});
	};
	cards[cardName] = newCard;
	return newCard;
};

card.config = {};
card.config.options = function(label, options){
	
};
card.config.bool = function(label){
	
};
card.config.number = function(label, min, max){
	
};
