var layer1Data = [139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139];
var layer2Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 96, 96, 96, 96, 96, 96, 96, 96, 0, 0, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 0, 0, 0, 96, 96, 96, 96, 96, 96, 96, 0, 0, 0, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96];


var TigerRetriever = TigerRetriever || {};
TigerRetriever.JsonGenerator = function(){};

TigerRetriever.JsonGenerator.prototype = {
    recreateInitialJson: function() {
        var layers = [];
        var tilesets = [];

        layers.push(this.makeLayer(layer1Data, 6, "backgroundLayer", 1, "tilelayer", true, 50, 0, 0));
        layers.push(this.makeLayer(layer2Data, 6, "blockedLayer", 1, "tilelayer", true, 50, 0, 0));
        layers.push(this.makeLayer(layer2Data, 6, "blockedLayer", 1, "tilelayer", true, 50, 0, 0));
        layers.push(this.makeLayer(null, 6, "objectsLayer", 1, "objectgroup", true, 50, 0, 0, layer3Objects));

        tilesets.push(this.makeTileset(1, "..\/images\/tiles_spritesheet.png", 934, 790, 0, "tiles_spritesheet", 2, 50, 50));

        return this.generate(6, 50, 70, 70, tilesets, layers);
    },
    makeTileset: function(firstgid, imageLocation, imageHeight, imageWidth, margin, name, spacing, tileHeight, tileWidth) {
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
    makeLayer: function(data, height, name, opacity, type, visible, width, x, y, objects) {
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
            layer.objects = (objects);
        }

        return layer;

    },
    generate: function(height, width, tilewidth, tileheight, tilesets, layers) {
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

    }
};

var layer3Objects = [
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":526,
        "y":219
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":647,
        "y":140
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":792,
        "y":174
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":910,
        "y":243
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":1435,
        "y":198
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":1514,
        "y":137
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":1710,
        "y":243
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":1644,
        "y":162
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":1362,
        "y":286
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":2489,
        "y":228
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":2610,
        "y":137
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":2789,
        "y":131
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":2947,
        "y":228
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":3107,
        "y":280
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":2032,
        "y":328
    },
    {
        "gid":143,
        "height":0,
        "name":"",
        "properties":
        {
            "sprite":"goldCoin",
            "type":"coin"
        },
        "type":"",
        "visible":true,
        "width":0,
        "x":344,
        "y":283
    }];