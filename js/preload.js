var TigerRetriever = TigerRetriever || {};

//loading the game assets
TigerRetriever.Preload = function(){};

TigerRetriever.Preload.prototype = {
    preload: function() {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(3);

        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        var generator = new TigerRetriever.JsonGenerator;
        var levelJson = JSON.stringify(generator.recreateInitialJson());

        this.load.tilemap('level1', null, levelJson, Phaser.Tilemap.TILED_JSON);

        this.load.spritesheet('zebra', 'assets/images/zebraaaaa.png',70,50,21,0,2);
        this.load.spritesheet('candyyyyy', 'assets/images/candyyyyy.png',40,40,4,0,2);

        this.load.spritesheet('gameTiles', 'assets/images/ground.png', 45, 45, 4, 0, 2);
        this.load.spritesheet('clouddddd', 'assets/images/othersprites.png', 200, 80, 5, 0, 2);
        this.load.image('playerDuck', 'assets/images/player_duck.png');

    },
    create: function() {
        this.state.start('Game');
    }
};