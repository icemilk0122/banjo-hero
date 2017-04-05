var BanjoString = function BanjoString(index, key) {
	var parent = this;
	this.name = key;
	this.stringNumber = index+1;
	this.sprite = game.add.tileSprite(getPosition(this.stringNumber), 0, STRING_HEIGHT, GAME_HEIGHT, 'common_string');
	this.notes = new NotesHandler(this);
	this.key = game.input.keyboard.addKey(key);
	this.key.onDown.add(this.pulse, this);
	this.button = new Button(this);

	function getPosition(stringNumber) {
		var offset = (stringNumber/2 == 0)?STRING_OFFSET:STRING_OFFSET*3;
		return GAME_WIDTH - ((STRING_OFFSET + STRING_HEIGHT) * stringNumber) - (Math.floor((stringNumber+1)/2)*150)
	}
}

BanjoString.prototype = {
	setNote: function() {
		this.notes.add();
	},
	update: function() {
		this.notes.update();
	},
	pulse: function() {
		this.button.push();
		var collisionType = this.notes.checkCollission(this.button.getCollisionArea());
	},
	onHit:function(callback) {
		this.notes.onHit = callback;
	}
}

var Button = function Button(string) {
	this.sprite = game.add.sprite(string.sprite.x-4, GAME_HEIGHT-20, 'button');
	this.push = function(){
		sprite = this.sprite;
		startInterval();
	}

	var timer;
	var sprite;

	function startInterval() {
		resetInterval();
		timer = setInterval(tick, 200);
		sprite.frame = 1;
	}
	function tick() {
		resetInterval();
		sprite.frame = 0;
	}
	function resetInterval() {
		clearInterval(timer);
		timer = undefined;
	}
}

Button.prototype = {
	getCollisionArea:function()
	{
		return {
			y:this.sprite.y,
			height:this.sprite.height
		};
	}
}
