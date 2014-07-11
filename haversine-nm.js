function toRad(value) {
    return ((value * 3.141592653589793) / 180);
}

/**
Modified haversine to match one object
to another based on closeness in width/height

An example application is finding the match
of a video to the size of a player.

This version seems to work well with verticies
large and small. 

 @param {Object} target Target object (ie: Player) width=>height
 @param {Object} prospect Prospect object (ie: Video Rendition) width=>height
*/
exports.haversine = function(target, prospect) {
  var R = 6372.8;
  var M = Math;
  var rad = toRad;
  var width = rad(prospect.width - target.width) / 1000;
  var height = rad(prospect.height - target.height) / 1000;
  var width1 = rad(target.width);
  var width2 = rad(prospect.width);
  var widthSin = M.sin(width / 2);
  var heightSin = M.sin(height / 2);
  
  var a = widthSin * widthSin +
    heightSin * heightSin *
    M.cos(width1) * M.cos(width2);
  var c = 2 * M.asin(M.sqrt(a))
  return R * c;
};

/**
For testing purposes,
let's define a set of prospetive
video renditions to select from
*/
var videoDimensions = require('dimensions');

function test() {
  /**
  Video player's dimension
  */
  var playerDimension = {
    width: 7600
    ,height: 4300
  };

  /**
  Lowest score wins!
  */
  var score = -1;

  /**
  The selected item -- based on score!
  */
  var selected = null;

  /**
   check if the prospect is >= to the target
   this would avoid stretching/pixelation in the case
   of a video rendition

   @param {Object} target Target object width=>height
   @param {Object} prospect Prospect object width=>height
  */
  function isLargeEnough(target, prospect) {
    return (prospect.width >= target.width && prospect.height >= target.height);
  }


  for (var i=0; i<videoDimensions.length; i++) {
    var prospect = videoDimensions[i];
    var res = exports.haversine(playerDimension, videoDimensions[i]);

    if (score <= -1) score = res; 
    
    if (isLargeEnough(playerDimension, prospect) && (res < score)) {
      score = res;
      selected = prospect;
    }
  }

  console.log(selected);
}

test();