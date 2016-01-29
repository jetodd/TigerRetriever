var TigerRetriever = TigerRetriever || {};

TigerRetriever.Game = function () {
};

TigerRetriever.Game.prototype = {
    preload: function () {
        this.game.time.advancedTiming = true;
    },
    create: function () {
        this.game.camera.follow(this.player);

        this.add.sprite(0, 0, 'sky');

        this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
        this.score = 0;

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        this.ground.body.immovable = true;

        this.ledge = this.platforms.create(400, 400, 'ground');

        this.ledge.body.immovable = true;

        this.ledge = this.platforms.create(-150, 250, 'ground');

        this.ledge.body.immovable = true;


        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.stars = this.game.add.group();

        this.stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        this.createStars();

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

    },
    createStars: function () {
        for (var i = 0; i < 12; i++) {
            //  Create a star inside of the 'stars' group
            var star = this.stars.create(i * 70, this.getRandomInt(1, 500), 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 6;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    },
    tooSlow: function (star, platforms) {
        star.kill();
    },
    collectStar: function (player, star) {
        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;

    },
    removeKilledStars: function () {
        this.stars.forEach(function (aStar) {
            if (aStar.alive !== true) {
                aStar.destroy();
            }
        });
    },
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    update: function () {
        //only respond to keys and keep the speed if the player is alive

        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.stars, this.platforms, this.tooSlow);
        this.game.physics.arcade.overlap(this.stars, this.player, this.collectStar, null, this);


        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -400;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 400;

            this.player.animations.play('right');
        }
        else {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }

        this.removeKilledStars();
        if (this.stars.length < 5) {
            this.createStars();
        }
    },
    render: function () {
        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
        this.game.debug.bodyInfo(this.player, 0, 80);
    }
};