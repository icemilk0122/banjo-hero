var game;
var timer = 0;
window.onload = function(){
	game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	var strings = [];
	var hud;
	var billboard = [];
	var music;

	function preload() {
		game.load.image('common_string', 'assets/string.png');
		game.load.spritesheet('button', 'assets/button.png', 16, 16, 2);
		game.load.audio('bgm', ['assets/audio/Something_Just_Lik.mp3']);
	}

	function create() {
		hud = new Hud();
		for(var index=0; index<STRING_KEYS.length; index++) {
			//var mybillboard = billboard[Math.floor(index/2)];
			var string = new BanjoString(index, STRING_KEYS[index]);
			string.onHit(function(type){
				//TODO: Implement strategy pattern here!
				switch(type) {
					case "GREAT":
						billboard[Math.floor((this.string.stringNumber-1)/2)].showGreat();
						hud.score();
						break;
					case "GOOD":
						billboard[Math.floor((this.string.stringNumber-1)/2)].showGood();
						hud.score();
						break;
					case "MISS":
						billboard[Math.floor((this.string.stringNumber-1)/2)].showMiss();
						hud.miss();
						break;
				}
			});
			strings.push(string);
		}
		for(var index=0; index<4; index++) {
			billboard.push(new Billboard(GAME_WIDTH-200*index-200));
		}
		game.time.events.loop(Phaser.Timer.SECOND, setNote, this);
		music = game.add.audio('bgm');
 		music.play();
	}

	function update() {
		for(var i in strings)
		{
			strings[i].update();
		}
	}

	function setRandomNote() {
		var rand = Math.floor(Math.random() * strings.length);
		strings[rand].setNote();
	}

	function setNote() {
		for(var index=0; index<STRING_KEYS.length; index++) {
			if(STRING_Notes["STRING_"+(index+1)][timer]==1)
			{
				strings[index].setNote();
			}
		}
		timer++;
	}

}
