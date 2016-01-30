var MainMenu = function(){};
module.exports = MainMenu;

MainMenu.prototype = {
    preload: function() {
        //show loading screen
    },
    create: function() {
        var xPosition = 340;
        var yPosition = 60;

        this.playText = this.game.add.text(xPosition, yPosition, 'Play', { fontSize: '32px', fill: '#000' });
        this.instructionsText = this.game.add.text(xPosition, yPosition + 60, 'Instructions', { fontSize: '32px', fill: '#000' });
        this.pandaText = this.game.add.text(xPosition, yPosition + 120, 'Hug a Panda', { fontSize: '32px', fill: '#000' });
    },
    update: function () {

    }
};