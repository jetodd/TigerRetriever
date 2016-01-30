//loading the game assets
var Preload = function(){};
module.exports = Preload;

Preload.prototype = {
    preload: function() {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(3);

        this.load.setPreloadSprite(this.preloadBar);

        var levelJson = JSON.stringify(require('../jsongenerator').recreateInitialJson());

        this.load.tilemap('level1', null, levelJson, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/background_spritesheet.png');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('playerDuck', 'assets/images/player_duck.png');
        this.load.image('playerDead', 'assets/images/player_dead.png');

    },
    create: function() {
        this.state.start('Game');
    }
};