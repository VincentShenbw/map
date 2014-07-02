/**
 * @author 沈秉文
 */
var xmlHttpFcgiroad;

function createXmlHttpRequest(){
    var xmlHttp=null;
	try
	{
	// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch(e)
	{
		try
		{
		// Internet Explorer
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e)
		{
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

function roadcondition(query)
{
	xmlHttpFcgiroad = createXmlHttpRequest();
    if(xmlHttpFcgiroad==null)
	{
		alert("您的浏览器不支持,AJAX");
		return;
	} 
    var url="RRR.fcgi?";
    url = url + query;
	//alert(url);
	xmlHttpFcgiroad.onreadystatechange=stateChangedroad;
	xmlHttpFcgiroad.open("GET",url,true);
	xmlHttpFcgiroad.send(url);
}

//call back
function stateChangedroad()
{
	if(xmlHttpFcgiroad.readyState==4)
	{
		//alert(xmlHttpFcgiroad.responseText);
        drawroadconditions(xmlHttpFcgiroad.responseText);
	}
}

function drawroadcondition(Coordinates, state, grb){
	var color = "#FFFFFF";
	if(state == 0) {
		color = "#FF0000";
	}
	else if(state == 1) {
		color = "#FF8C69"
	}
	else if(state == 2) {
		color = "#FFFF00"
	}
	else if(state == 3) {
		color = "#00FF00"
	}
	if(grb==1){
		var routePathi = new google.maps.Polyline({
			//path: Coordinates,
    		strokeColor: color,
    		strokeOpacity: 1,
    		strokeWeight: 8,
    		});
		routePathi.setPath(Coordinates);
  		routePathi.setMap(map);
  		googleroutePath_con.push(routePathi);
 	}
 	else
 	{
 		var routePath_baidui = new BMap.Polyline(null,{
    		//path: Coordinates,
    		strokeColor: color,
    		strokeOpacity: 1,
    		strokeWeight: 8,
  		});
  		routePath_baidui.setPath(Coordinates);
		map_baidu.addOverlay(routePath_baidui);
		baiduroutePath_con.push(routePath_baidui);
 	}
}

function drawroadconditions(responseText){
	var strs = responseText.split(" ");
	if(strs[0]=="google"){
		for(var i = 1;i<strs.length-1;i++)
		{	
			var Coordinates = new Array();
			var temp = strs[i].split(",");
			Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
			temp = strs[i+1].split(",");
			Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
			var state = temp[2];
			//if(state != 3) {
			drawroadcondition(Coordinates, state, 1);
			//}
		}
	}
	else
	{
		for(var i = 1;i<strs.length-1;i++)
		{	
			var Coordinates = new Array();
			var temp = strs[i].split(",");
			Coordinates.push(new BMap.Point(parseFloat(temp[1]),parseFloat(temp[0])));
			temp = strs[i+1].split(",");
			Coordinates.push(new BMap.Point(parseFloat(temp[1]),parseFloat(temp[0])));
			var state = temp[2];
			//if(state != 3) {
			drawroadcondition(Coordinates, state, 2);
			//}
		}
	}
}

function removeedges()
{
	var lengt = googleroutePath_con.length;
	for(var i = lengt-1;i >= 0;i --)
	{
		googleroutePath_con[i].setMap(null);
		googleroutePath_con.pop();
	}
}

