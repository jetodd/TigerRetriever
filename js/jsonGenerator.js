var TigerRetriever = TigerRetriever || {};

TigerRetriever.JsonGenerator = function () {
};
var mapHeight = 6;
var minLand = 4;
var minGap = 2;
var maxGap = 3;
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
        layers.push(this.makeLayer(null, mapHeight, "objectsLayer", 1, "objectgroup", true, mapWidth, 0, 0, this.makeCandies()));
        layers.push(this.makeLayer(null, mapHeight, "cloudsLayer", 1, "objectgroup", true, mapWidth, 0, 0, cloudsLayer));

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
        var candies = [];

        candies.push(this.makeCandyObject(300, 150));
        candies.push(this.makeCandyObject(600, 150));
        candies.push(this.makeCandyObject(800, 150));

        return candies;
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
        var landIndex = 1;

        for (i = 0; i < 15; i++) {
            mapBase[startIndex + i] = landIndex;
            landIndex++;
            if (landIndex == 4) {
                landIndex = 1;
            }
        }

        // Generate array for map
        // 1 = land, 0 = gap
        for (i = startIndex + 15; i < maxIndex - 15; i++) {
            // Enforce minimum amount of land
            if (landCount < minLand && landCount > 0) {
                mapBase[i] = landIndex;
                landIndex++;
                gapCount = 0;
                landCount++;
                // Enforce minimum amount of gaps as we can't fall down 1 tile wide gap
            } else if (gapCount < minGap && gapCount > 0) {
                gapCount++;
                mapBase[i] = 0;
                landCount = 0;
            } else {
                if (utils.getRandomInt(0, 1) == 1) {
                    gapCount++;
                    mapBase[i] = 0;
                    landCount = 0;
                } else {
                    mapBase[i] = landIndex;
                    landIndex++;
                    landCount++;
                    gapCount = 0;
                }
            }

            if (landIndex == 4) {
                landIndex = 1;
            }
        }

        for (i = 15; i > 0; i--) {
            mapBase[maxIndex - i] = landIndex;
            landIndex++;
            if (landIndex == 4) {
                landIndex = 1;
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
    makeCandyObject: function (x, y) {
        return {
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

var cloudsLayer = [{
    "gid": 1,
    "height": 0,
    "name": "",
    "properties": {
        "sprite": "clouddddd",
        "type": "cloud"
    },
    "type": "",
    "visible": true,
    "width": 0,
    "x": 300,
    "y": 100
}];
