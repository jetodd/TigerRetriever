var TigerRetriever = TigerRetriever || {};

TigerRetriever.game = new Phaser.Game(750, 240, Phaser.AUTO, '');

TigerRetriever.game.state.add('Boot', TigerRetriever.Boot);
TigerRetriever.game.state.add('Preload', TigerRetriever.Preload);
TigerRetriever.game.state.add('MainMenu', TigerRetriever.MainMenu);
TigerRetriever.game.state.add('Game', TigerRetriever.Game);

TigerRetriever.game.state.start('Boot');