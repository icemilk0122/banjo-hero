var game;
var timer = 0;
window.onload = function(){
	game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	var strings = [];
	var hud;
	var billboard = [];
	var music;
	//airconsole
	var deviceIds = [];
	var airconsole = new AirConsole();

	function preload() {
		game.load.image('common_string', 'assets/blue.png', 85, 830);
		game.load.spritesheet('button', 'assets/button.png', 82, 82, 2);
		game.load.image('button_blue', 'assets/bluebeat.png', 82, 82);
		game.load.audio('bgm', ['assets/audio/Something_Just_Lik.mp3']);
	}

	//airconsole
	airconsole.onMessage = function(deviceId, data) {
			// checking if the deviceId is already in deviceIds vector, and if it's not...
			if (deviceIds.indexOf(deviceId) == -1) {
					// pushing the device id
					deviceIds.push(deviceId);
			}
			switch (deviceId) {
				case 1:
						console.log('1'+','+data);
						if(data == '0')
						{
							strings[9].pulse();
						}else {
							strings[8].pulse();
						}
						break;
				case 2:
						console.log('2'+','+data);
						if(data == '0')
						{
							strings[7].pulse();
						}else {
							strings[6].pulse();
						}
						break;
				case 3:
						console.log('3'+','+data);
						if(data == '0')
						{
							strings[5].pulse();
						}else {
							strings[4].pulse();
						}
						break;
				case 4:
						console.log('4'+','+data);
						if(data == '0')
						{
							strings[3].pulse();
						}else {
							strings[2].pulse();
						}
						break;
				case 5:
						console.log('5'+','+data);
						if(data == '0')
						{
							strings[1].pulse();
						}else {
							strings[0].pulse();
						}
						break;
			}
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
		for(var index=0; index<5; index++) {
			billboard.push(new Billboard(GAME_WIDTH-380*index-52-STRING_WIDTH));
		}
		game.time.events.loop(Phaser.Timer.SECOND, setNote, this);
		music = game.add.audio('bgm');
 		//music.play();
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
