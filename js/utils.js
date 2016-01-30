var TigerRetriever = TigerRetriever || {};
TigerRetriever.utils = function(){};

TigerRetriever.utils.prototype = {
	getRandomInt: function(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	get_type: function(thing) {
    	if(thing===null)return "[object Null]"; // special case
    	return Object.prototype.toString.call(thing);
	}
}