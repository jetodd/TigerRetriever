var exports = exports || function(){};

var TigerRetriever = TigerRetriever || {};

TigerRetriever.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
TigerRetriever.Boot.prototype = {
    preload: function() {
        //assets we'll use in the loading screen
        this.load.image('preloadbar', 'assets/images/preloader-bar.png'); // not made yet
    },
    create: function() {
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#0066ff';

        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //screen size will be set automatically
        //this.scale.setScreenSize(true);

        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
};