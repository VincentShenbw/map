/**
 * @author 沈秉文
 */
var xmlHttpFcgiDemo;

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

function demo(query)
{
	xmlHttpFcgiDemo = createXmlHttpRequest();
    if(xmlHttpFcgiDemo==null)
	{
		alert("您的浏览器不支持,AJAX");
		return;
	} 
    var url="RRR.fcgi?";
    url = url + query;
	//alert(url);
	xmlHttpFcgiDemo.onreadystatechange=stateChangedDemo;
	xmlHttpFcgiDemo.open("GET",url,true);
	xmlHttpFcgiDemo.send(url);
}

//call back
function stateChangedDemo()
{
	if(xmlHttpFcgiDemo.readyState==4)
	{
		//alert(xmlHttpFcgiDemo.responseText);
        drawroads(xmlHttpFcgiDemo.responseText);
	}
}

function drawroad(Coordinates, state){
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
	var routePathi = new google.maps.Polyline({
		//path: Coordinates,
   		strokeColor: color,
   		strokeOpacity: 1,
   		strokeWeight: 5,
  		});
	routePathi.setPath(Coordinates);
	routePathi.setMap(map);
	googleroutePath_con.push(routePathi);
}

function drawroads(responseText){
	var strs = responseText.split(" ");
	//alert(strs.length);
	for(var i = 0;i<strs.length-2;i=i+2) {
	{	
		var Coordinates = new Array();
		var temp = strs[i].split(",");
		Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
		temp = strs[i+1].split(",");
		Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
		var state = temp[2];
		//if(state != 3) {
		drawroad(Coordinates, state);
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

var hour = 0;
function offline() {
	//alert(hour);
	if(hour == 0) {
		removeedges();
	}
	var timestring = hour+":00~"+(hour+1)+":00";
	//alert(timestring);
	//document.getElementById("Hour").innerText = timestring; 
	document.getElementById("Time").innerText = timestring; 

	var query = "query="+hour+",offline";
	demo(query);
	hour = hour+1;
	if(hour < 24) {//0~23
		window.setTimeout('offline()', 3000);
		removeedges();
	}
	else if(hour == 24) {
		hour = 0;
	}
}

var fixhour = 16;
var second = 0;
var minute = 0;
function online() {
	//alert(fixhour);
	var timestring = fixhour+":"+minute+":"+second;
	//alert(timestring);
	//document.getElementById("Hour").innerText = timestring; 
	document.getElementById("Time").innerText = timestring; 
	second = second+1;
	if(second == 59) {
		second = 0;
		minute = minute+1;
	}
	var query = "query="+fixhour+",online";
	demo(query);
	if(minute < 60) {//0~59
		window.setTimeout('online()', 10);
	}
	else if(minute == 60) {
		minute = 0;
	}

}
