var NotesHandler = function Note(string) {
	this.string = string;
	this.notes = [];
	this.onHit = function(){};
}

NotesHandler.prototype = {
	add: function() {
		this.notes.push(new Note(this.string));
	},
	update: function() {
		for(var i in this.notes) {
			this.notes[i].move();
		}
		if (this.notes.length > 0)	{
			if (this.notes[0].sprite.y > GAME_HEIGHT-300) {
				this.onHit("MISS");
				this.removeNote();
			}
		}
	},
	checkCollission:function(collisionArea){
		var first = this.notes[0];
		if (first !== undefined){
			var firstEndDiff = collisionArea.y - first.sprite.y;
			var secondEndDiff = (collisionArea.y-collisionArea.height) - (first.sprite.y-first.sprite.height);
			var match = (Math.abs(firstEndDiff)+Math.abs(secondEndDiff))/2;
			if (match <= first.sprite.height) {
				this.removeNote();
				if (match <= 5)
					this.onHit("GREAT");
				else
					this.onHit("GOOD");
			}
		}
	},
	removeNote:function(){
		note = this.notes.shift();
		note.destroy();
	}
};

var Note = function Note(string) {
	this.sprite = game.add.sprite(string.sprite.x+2, 0 , 'button_blue');
}

Note.prototype = {
	move: function(){
		this.sprite.y++;
	},
	destroy: function(){
		this.sprite.destroy();
		this.sprite = undefined;
	}
}
