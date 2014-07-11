function toRad(value) {
    return ((value * 3.141592653589793) / 180);
}

exports.havestine = function(target, prospect) {
	var R = 6371;
	var M = Math;
	var rad = toRad;
	var width = rad(prospect.width - target.width) ;
	var height = rad(prospect.height - target.height) ;
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

exports.havestine2 = function(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = 
     0.5 - Math.cos(dLat)/2 + 
     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
     (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
}


var max = 1;

for (var i=0; i<max; i++) {
	console.log(exports.havestine2(8, 7, 8, 6));
	console.log(exports.havestine({width: 8, height: 7}, {width: 8, height: 6}));
}