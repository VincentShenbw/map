/**
 * @author 沈秉文
 */
/**

the tencent way

*/
function fromMtoLL(x, y) {
    var EARTH_RADIUS = 6378137;
    var METERS_PER_DEGREE = (EARTH_RADIUS * Math.PI / 180.0);
    x = x / METERS_PER_DEGREE;
    y = 180.0 / Math.PI * (2 * Math.atan(Math.exp(y / EARTH_RADIUS)) - Math.PI / 2.0);
    var ret={'lon':x,'lat':y};
    return ret;
}

/*
    x lon    y lat
*/
function fromLLtoM(x, y) {
    var EARTH_RADIUS = 6378137;
    var METERS_PER_DEGREE = (EARTH_RADIUS * Math.PI / 180.0);
    if(Math.abs(y) > 85.0511) {
        y = y > 0 ? 85.0511 : -85.0511;
    }
    if(Math.abs(x) > 180.0) {
        x = x > 0 ? 180.0 : -180.0;
    }
    x = x * METERS_PER_DEGREE;
    y = Math.log(Math.tan((90.0 + y) * Math.PI / 360.0)) * EARTH_RADIUS;
    var ret={'x':x,'y':y};
    return ret;
}