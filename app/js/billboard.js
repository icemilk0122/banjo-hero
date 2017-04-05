var TEXT_STYLE = { font: '30px Arial', align: 'center', fill:'#0f0' };
var GREAT = 'Great!!';
var GREAT_COLOR = '#0f0';
var GOOD = 'Good';
var GOOD_COLOR = '#ff0';
var MISS = 'Miss :(';
var MISS_COLOR = '#f00';
var offset_X;

var Billboard = function Billboard(offset_X) {
	this.greatText = createText(GREAT, GREAT_COLOR);
	this.goodText = createText(GOOD, GOOD_COLOR);
	this.missText = createText(MISS, MISS_COLOR);
	offset_X = offset_X;

	function createText(string, color) {
		var style = TEXT_STYLE;
		style.fill = color;
		var text = game.add.text(offset_X, 400, string, style);
		text.visible = false;
		text.anchor.set(0.5);
		return text;
	}
}

Billboard.prototype = getPrototype();

function getPrototype() {
	function show(text) {
		text.visible = true;
		setTimeout(function(){
			text.visible = false;
		}, 500);
	}
	return {
		showGreat:function(){
			this.hideAll();
			show(this.greatText);
		},
		showGood:function(){
			this.hideAll();
			show(this.goodText);
		},
		showMiss:function(){
			this.hideAll();
			show(this.missText);
		},
		hideAll:function(){
			this.greatText.visible = false;
			this.goodText.visible = false;
			this.missText.visible = false;
		}
	}
}
