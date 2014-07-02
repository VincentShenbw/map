/**
 * @author 沈秉文
 */

var locationx;
var locationy;
var Num;

function datageneration() {
	
	//alert("display pressed");
	Num = 2 * parseInt(document.getElementById("itemNum").value);
	//alert(Num);
	
	var latitudeStart = 39.77793580403028;
	var latitudeEnd = 40.02340800226773;
	var longitudeStart = 116.21234893798828;
	var longitudeEnd = 116.54571533203125;
	var latitudeTemp;
	var longitudeTemp;
	
	locationx = new Array();
	locationy = new Array();
	
	for (var i = 0; i < Num; i++) {
		latitudeTemp = (latitudeEnd - latitudeStart) * Math.random() + latitudeStart;
		longitudeTemp = (longitudeEnd - longitudeStart) * Math.random() + longitudeStart;
		locationx.push(latitudeTemp);
		locationy.push(longitudeTemp);
	}
	
	//alert(locationx[0] + "," + locationy[0]);
	//alert(locationx[1] + "," + locationy[1]);
	
	PostRRRRequest();
	PostGoogleRequest();
	PostBaiduRequest();
	PostResult();
	
}