var cards = {};

var card = function(cardName){
	var newCard = function(column, order){
		this.parent = $('<article class="card '+cardName+'"><div class="front"></div><div class="back"></div><div class="configbutton"><i class="icon-cog"></i></div><div class="unconfigbutton"><i class="icon-check-sign"></i></div></article>');
		this.parent[0].cardObject = this;
		this.element = this.parent.find('.front');
		this.back = this.parent.find('.back');
		this.column = column;
		this.order = order;
		
		this.config = newCard.config.default;
		
		var self = this;
		this.parent.on('moved', function(){
			if ($(this).parent().hasClass('trash')) {
				self.destroy();
				self.parent.remove();
			} else if ($(this).parent().hasClass('newcolumn')) {
				if ($(this).parent().hasClass('left')) {
					self.column = 1;
					$('.column').each(function(){
						$(this).attr('data-id', $(this).attr('data-id')*1+1);
					});
				} else {
					self.column = $(this).parent().prev().attr('data-id')*1+1;
				}
				self.order = $(this).index();
				addColumn(self.column);
				self.saveConfig();
			} else {
				self.column = $(this).parent().attr('data-id');
				self.order = $(this).index();
				
				self.saveConfig();
			}
		});
		
		if (!Object.keys(newCard.config.schema).length) {
			this.parent.find('.configbutton, .unconfigbutton').remove();
		} else {
			this.parent.find('.configbutton, .unconfigbutton').on('click', function(e){
				if (self.parent.hasClass('flipped')) {
					self.back.find('.config dd').each(function(){
						var field = $(this).attr('data-field');
						self.config[field] = newCard.config.schema[field].read($(this).children()[0]);
					});
					self.saveConfig();
					self.changeConfig();
				}
				self.parent.toggleClass('flipped');
			});
		}
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
		this.showConfig();
	};
	newCard.prototype.saveConfig = function(){
		if (!config.layout[this.column]) {
			config.layout[this.column] = [];
		}
		if (!config.layout[this.column][this.order]) {
			config.layout[this.column][this.order] = {card: cardName};
		}
		for (var i in this.config) {
			if (i == 'card') continue;
			config.layout[this.column][this.order][i] = this.config[i];
		}
		saveConfig();
	};
	newCard.prototype.changeConfig = function(){
		this.run();
	};
	newCard.prototype.view = function(data){
		this.element.html('<p>No render function has been added to this card :(</p>');
	};
	newCard.prototype.controller = function(callback){
		callback && callback({});
	};
	newCard.prototype.show = function(parent){
		this.parent.appendTo(parent);
	};
	newCard.prototype.setup = function(){};
	newCard.prototype.run = function(callback){
		var self = this;
		this.controller(function(data){
			self.view(data);
			callback && callback.apply(self);
		});
	};
	newCard.prototype.showConfig = function(){
		var form = $('<form class="config" action><dl></dl><br style="clear:both"/></form>');
		for (var i in newCard.config.schema) {
			var item = $('<dt></dt><dd></dd>');
			var label = $('<dt></dt>').text( newCard.config.schema[i].label );
			var stuff = $('<dd></dd>').attr('data-field', i).html( newCard.config.schema[i].write(this.config[i]) );
			label.appendTo(form.find('dl'));
			stuff.appendTo(form.find('dl'));
		}
		this.back.html(form);
	};
	newCard.prototype.destroy = function(){};
	cards[cardName] = newCard;
	return newCard;
};

card.config = {};
card.config.options = function(label, options){
	this.label = label;
	this.options = options;
};
card.config.options.prototype.write = function(value){
	var select = $('<select></select>');
	for (var field in this.options) {
		var option = $('<option></option>');
		option.val(field);
		option.text(this.options[field]);
		if (field == value) {
			option.attr('selected', true);
		}
		option.appendTo(select);
	}
	return select;
};
card.config.options.prototype.read = function(el){
	return $(el).val();
}

card.config.text = function(label, def){
	this.label = label;
	this.def = def;
};
card.config.text.prototype.write = function(value){
	var el = $('<input type="text"/>');
	if (value != this.def) {
		el.val(value);
	}
	if (this.def) {
		el.attr('placeholder', this.def);
	}
	return el;
};
card.config.text.prototype.read = function(el){
	return $(el).val() || this.def;
};

card.config.bool = function(label){
	this.label = label;
};
card.config.bool.prototype.write = function(value){
	return '<input type="checkbox"'+(value ? ' checked' : '')+'/>';
};
card.config.bool.prototype.read = function(el){
	return el.checked;
};

card.config.number = function(label, min, max){
	this.label = label;
	this.min = min;
	this.max = max;
};
card.config.number.prototype.write = card.config.text.prototype.write;
card.config.number.prototype.read = card.config.text.prototype.read;
