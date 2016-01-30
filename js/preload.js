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
        this.load.spritesheet('player', 'assets/images/zebraaaaa.png',70,50,7,0,2);
        this.load.spritesheet('gameTiles', 'assets/images/background_spritesheet.png', 45, 45,2, 0, 2);
        this.load.image('playerDuck', 'assets/images/player_duck.png');
        this.load.image('playerDead', 'assets/images/player_dead.png');
        this.load.image('goldCoin', 'assets/images/goldCoin.png');
        this.load.audio('coin', ['assets/audio/coin.ogg', 'assets/audio/coin.mp3']);

    },
    create: function() {
        this.state.start('Game');
    }
};