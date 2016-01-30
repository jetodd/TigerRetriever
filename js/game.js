var TigerRetriever = TigerRetriever || {};

TigerRetriever.Game = function(){
    this.INIT_HERD_SIZE = 15;
    this.MEMBER_START_VARIANCE = 75;
    this.HERD_START_POSITION = 0; //x coordinate at center of herd
    this.MEMBER_OFFSET_TOLERANCE = 100;
};

TigerRetriever.Game.prototype = {
    preload: function() {
        this.game.time.advancedTiming = true;
    },
    create: function() {

        this.map = this.game.add.tilemap('level1');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');

        //create layers
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 5000, true, 'blockedLayer');

        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();

        this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.createCandy();
        this.createClouds();

        //create array of herd members
        this.herd = this.newHerd(this.INIT_HERD_SIZE);

        //the camera will follow the player in the world
        this.game.camera.follow(this.herdLeader());

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.upKeyDownLastUpdate = false;
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function(type, map, layerName) {
        var result = new Array();
        map.objects[layerName].forEach(function(element){
            if(element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that some images could be of different size as the tile size
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    //create a sprite from an object
    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    },
    collectCandy: function(player, collectable) {
        collectable.destroy();
    },
    update: function() {
        //collisions
        this.updateHerd();

        if(this.herd.some(function(member) { return member.alive; })) {
            this.game.physics.arcade.overlap(this.herd, this.candies, this.collectCandy, null, this);
            this.herd.forEach(function (animal) {
                //the members velocity offset
                var median = math.median(this.herd.map(function (m) { return m.body.x; }));
                
                animal.body.velocity.x = 300;
            });

            if (this.cursors.up.isDown && !this.upKeyDownLastUpdate) {
                var leader = this.herdLeader();
                if (leader.body.blocked.down) {
                    this.herd.forEach(function (member) {
                        member.jumpPoints.push(leader.body.x);
                    });
                }
                this.upKeyDownLastUpdate = true;
            } else {
                this.upKeyDownLastUpdate = false;
            }

            //restart the game if reaching the edge
            if(this.herd[0].x >= this.game.world.width) {
                this.game.state.start('Game');
            }
        }
    },
    animalHit: function(animal, blockedLayer) {
        //if hits on the right side, die
        if(animal.body.blocked.right) {
            //set to dead (this doesn't affect rendering)
            animal.alive = false;

            //stop moving to the right
            animal.body.velocity.x = 0;

            //change sprite image
            //animal.loadTexture('playerDead');

            //check herd still living animals
            var gameOver = true;
            this.herd.forEach(function (animal) {
                if (animal.alive) {
                    gameOver = false;
                }
            });

            //go to gameover after a few miliseconds
            if (gameOver) {
                this.game.time.events.add(1500, this.gameOver, this);
            }
        }
    },
    gameOver: function() {
        this.game.state.start('Game');
    },
    render: function()
    {
        //this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
        //this.herd.forEach(function (animal) {
        //    this.game.debug.bodyInfo(animal, 0, 80);
        //}, this);
    },
    pickZebraSprite: function() {
        var utils = new TigerRetriever.utils;

        var spriteKey = utils.getRandomInt(0, 2)    ;

        var animationFrames = [];
        for (var j = spriteKey; j < spriteKey + 21; j+=3) {
            animationFrames.push(j)
        }

        return { "spriteKey": spriteKey, "animationFrames":  animationFrames};
    },
    newHerd: function(size) {
        var members = [];
        for (var i = 0; i < size; i++) {
            //make new member of the herd
            var herdPosition = this.HERD_START_POSITION;
            var memberVariance = this.MEMBER_START_VARIANCE;
            var offset = Math.random() * (memberVariance - -(memberVariance)) + -memberVariance;
            var sprite = this.pickZebraSprite();
            var member = this.game.add.sprite(herdPosition + offset, 100, 'zebra', sprite.spriteKey);
            member.animations.add('right', sprite.animationFrames, 10, true);

            //enable physics on the member
            this.game.physics.arcade.enable(member);

            //player gravity
            member.body.gravity.y = 1000;

            //properties when the member is ducked and standing, so we can use in update()
            var playerDuckImg = this.game.cache.getImage('playerDuck');
            member.duckedDimensions = {width: playerDuckImg.width, height: playerDuckImg.height};
            member.standDimensions = {width: member.width, height: member.height};
            member.anchor.setTo(0.5, 1);

            member.jumpPoints = [];

            members.push(member);
        }
        return members;
    },
    createCandy: function() {
        this.candies = this.game.add.group();
        this.candies.enableBody = true;
        var result = this.findObjectsByType('candy', this.map, 'objectsLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.candies);
        }, this);
    },
    createClouds: function() {
        this.clouds = this.game.add.group();
        this.clouds.enableBody = true;
        var result = this.findObjectsByType('cloud', this.map, 'cloudsLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.clouds);
        }, this);
    },
    updateHerd: function() {
        this.herd.forEach(function(member) {
            this.game.physics.arcade.collide(member, this.blockedLayer, this.animalHit, null, this);

            member.animations.play('right');

            if (member.jumpPoints.length) {
                var x = member.jumpPoints[0];
                if (member.body.x > x) {
                    member.body.velocity.y -= 400;
                    member.jumpPoints.shift();
                }
            }
        }, this);
    },
    herdLeader: function() {
        return this.herd.reduce(function(currentLeader, nextMember) {
            if (nextMember.x > currentLeader.x) {
                return nextMember;
            } else {
                return currentLeader;
            }
        });
    }
};