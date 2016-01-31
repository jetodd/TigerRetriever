var TigerRetriever = TigerRetriever || {};

TigerRetriever.JsonGenerator = function () {
};

var mapHeight = 6;
var minLand = 3;
var minGap = 2;
var maxGap = 4;
var tileWidth = 45;
var tileHeight = 45;
var mapWidth = 300;

TigerRetriever.JsonGenerator.prototype = {
    recreateInitialJson: function () {
        var layers = [], tilesets = [];
        var background = new Array(mapWidth * mapHeight);
        background.fill(4);

        layers.push(this.makeLayer(background, mapHeight, "backgroundLayer", 1, "tilelayer", true, mapWidth, 0, 0));
        layers.push(this.makeLayer(this.makeMapBase(), mapHeight, "blockedLayer", 1, "tilelayer", true, mapWidth, 0, 0));
        layers.push(this.makeLayer(null, mapHeight, "cloudsLayer", 1, "objectgroup", true, mapWidth, 0, 0, this.makeClouds()));
        layers.push(this.makeLayer(null, mapHeight, "objectsLayer", 1, "objectgroup", true, mapWidth, 0, 0, this.makeCandies()));

        tilesets.push(this.makeTileset(0, "..\/images\/ground.png", 1000, 45, 0, "tiles_spritesheet", 2,
            tileWidth, tileHeight));

        return this.generate(mapHeight, mapWidth, tileWidth, tileHeight, tilesets, layers);
    },
    makeTileset: function (firstgid, imageLocation, imageHeight, imageWidth, margin, name, spacing, tileHeight, tileWidth) {
        return {
            "firstgid": firstgid,
            "image": imageLocation,
            "imageheight": imageHeight,
            "imagewidth": imageWidth,
            "margin": margin,
            "name": name,
            "properties": {},
            "spacing": spacing,
            "tileheight": tileHeight,
            "tilewidth": tileWidth
        };
    },
    makeCandies: function () {
        var utils = new TigerRetriever.utils;
        var candies = [];

        var candyX = 600;
        // Between 150 and 200
        var candyY = 160;

        while (candyX < mapWidth * tileWidth - (15 * tileWidth)) {
            if (utils.getRandomInt(0, 1) == 1) {
                candyY -= utils.getRandomInt(0, 40);
            } else {
                candyY += utils.getRandomInt(0, 40);
            }

            candies.push(this.makeCandyObject(candyX, candyY, utils.getRandomInt(0, 3)));
            candyX += utils.getRandomInt(100, 250);
            candyY = 150;
        }

        return candies;
    },
    makeClouds: function () {
        var utils = new TigerRetriever.utils;
        var clouds = [];

        var cloudX = 800;
        // Between 150 and 200
        var cloudY = 100;
        clouds.push(this.makeCloudObject(300, 100, 0))

        while (cloudX < mapWidth * tileWidth - (15 * tileWidth)) {
            if (utils.getRandomInt(0, 1) == 1) {
                cloudY -= utils.getRandomInt(0, 90);
            } else {
                cloudY += utils.getRandomInt(0, 70);
            }


            clouds.push(this.makeCloudObject(cloudX, cloudY, utils.getRandomInt(1, 3)));
            cloudY = 100;
            if (utils.getRandomInt(0,3) == 0) {
                if (utils.getRandomInt(0, 1) == 1) {
                cloudY -= utils.getRandomInt(0, 90);
            } else {
                cloudY += utils.getRandomInt(0, 70);
            }
            cloudX += 110;
            }
            cloudX += utils.getRandomInt(200, 500);
            cloudY = 100;
        }

        return clouds;
    },
    makeMapBase: function () {
        var utils = new TigerRetriever.utils;
        var gapCount = 0;
        var landCount = 5;
        var mapBase = new Array(mapWidth * mapHeight);
        mapBase.fill(0);

        var startIndex = (mapHeight - 1) * mapWidth;
        var maxIndex = mapWidth * mapHeight;

        mapBase.fill(1, startIndex, startIndex + 15);
        mapBase.fill(1, maxIndex - 15, maxIndex);
        var spriteIndex = 1;

        for (i = 0; i < 15; i++) {
            mapBase[startIndex + i] = spriteIndex;
            spriteIndex++;
            if (spriteIndex == 4) {
                spriteIndex = 1;
            }
        }

        // Generate array for map
        // 1 = land, 0 = gap
        for (i = startIndex + 15; i < maxIndex - 15; i++) {
            if ((gapCount == maxGap) || (landCount < minLand && landCount > 0)) {
                mapBase[i] = spriteIndex;
                spriteIndex++;
                gapCount = 0;
                landCount++;
            } else if (gapCount < minGap && gapCount > 0) {
                gapCount++;
                mapBase[i] = 0;
                landCount = 0;
            }else {
                if (utils.getRandomInt(0, 1) == 1) {
                    gapCount++;
                    mapBase[i] = 0;
                    landCount = 0;
                } else {
                    mapBase[i] = spriteIndex;
                    spriteIndex++;
                    landCount++;
                    gapCount = 0;
                }
            }

            if (spriteIndex == 4) {
                spriteIndex = 1;
            }
        }

        for (i = 15; i > 0; i--) {
            mapBase[maxIndex - i] = spriteIndex;
            spriteIndex++;
            if (spriteIndex == 4) {
                spriteIndex = 1;
            }
        }

        return mapBase;
    },
    makeLayer: function (data, height, name, opacity, type, visible, width, x, y, objects) {
        layer = {
            "height": height,
            "name": name,
            "opacity": opacity,
            "type": type,
            "visible": visible,
            "width": width,
            "x": x,
            "y": y
        };

        if (data) {
            layer.data = data;
        }

        if (objects) {
            layer.objects = objects;
        }

        return layer;

    },
    generate: function (height, width, tilewidth, tileheight, tilesets, layers) {
        return json = {
            "height": height,
            "layers": layers,
            "orientation": "orthogonal",
            "properties": {},
            "tileheight": tileheight,
            "tilesets": tilesets,
            "tilewidth": tilewidth,
            "version": 1,
            "width": width
        }
    },
    makeCandyObject: function (x, y, spriteId) {
        return {
            "gid": spriteId,
            "height": 0,
            "name": "",
            "properties": {
                "sprite": "candyyyyy",
                "type": "candy",
                "spriteKey": spriteId
            },
            "type": "",
            "visible": true,
            "width": 0,
            "x": x,
            "y": y
        };
    },
    makeCloudObject: function (x, y, spriteId) {
        return {
            "gid": spriteId,
            "height": 0,
            "name": "",
            "properties": {
                "sprite": "clouddddd",
                "type": "cloud",
                "spriteKey": spriteId
            },
            "type": "",
            "visible": true,
            "width": 0,
            "x": x,
            "y": y
        };
    }
};

var objectsLayer = [{
    "gid": 1,
    "height": 0,
    "name": "",
    "properties": {
        "sprite": "candyyyyy",
        "type": "candy"
    },
    "type": "",
    "visible": true,
    "width": 0,
    "x": 512,
    "y": 145
}];


