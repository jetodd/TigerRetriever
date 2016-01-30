'use strict';
var game = new Phaser.Game(746, 280, Phaser.AUTO, 'TigerRetriever');

game.state.add('Boot', require('./states/boot'));
game.state.add('Preload', require('./states/preload'));
game.state.add('Game', require('./states/game'));
game.state.add('MainMenu', require('./states/mainmenu'));

game.state.start('Boot');