/**
 * @author 沈秉文
 */

//传送数据给fcgi，从fcgi接收数据
var ajaxFcgi;

function select(whichLink) {
	var as = document.getElementsByTagName("a");
	for ( var i = 0; i < as.length; i++) {
		as[i].setAttribute("class");
		whichLink.setAttribute("class", "bg");
	}
}

function datetime_to_unix(datetime){
	var tmp_datetime = datetime.replace(/:/g,'-');
	tmp_datetime = tmp_datetime.replace(/ /g,'-');
	var arr = tmp_datetime.split("-");
	var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
	return parseInt(now.getTime()/1000);
}
 
function unix_to_datetime(unix) {
	var now = new Date(parseInt(unix) * 1000);
	return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

function process()
{
	
	startsearch();
	
	endsearch();
	
	var startq=document.getElementById('start').value;
	var endq=document.getElementById('end').value;
	var settime=document.getElementById('settime').value;
	var timeq="2009-05-01 16:26:10";
	timeq=datetime_to_unix(timeq);
	var routeState = document.getElementById('routeState').value;// 1 for time, 2 for distance
	var query="query="+startq+","+endq+","+settime+","+routeState;// Format is: query=startx,starty,endx,endy,time
	
	removehana();
	removegoogle();
	removebaidu();
	
	fcgiPost(query);
	
	//放置起点和终点
	var temp1 = startq.split(",");
	var temp2 = endq.split(",");
	
	marker1.set('position',new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])));
	marker1.setMap(map);
	
	marker_baidu1.setPosition(new BMap.Point(parseFloat(temp1[1]),parseFloat(temp1[0])));
	map_baidu.addOverlay(marker_baidu1);
	marker_baidu2.setPosition(new BMap.Point(parseFloat(temp2[1]),parseFloat(temp2[0])));
	map_baidu.addOverlay(marker_baidu2);
	
	marker2.set('position',new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])));
	marker2.setMap(map);
  	
  	//设置新的地图中心
  	map.setCenter(new google.maps.LatLng((parseFloat(temp1[0])+parseFloat(temp2[0]))/2, (parseFloat(temp1[1])+parseFloat(temp2[1]))/2));
	map.setZoom(12);
	
	var contentString1 = '<div id="content">'+
      	'<h1 id="firstHeading" class="firstHeading">start point</h1>'+
      	'<div id="bodyContent">'+
      	'<p><b>纬度：'+temp1[0]+'</b>'+
      	'<p><b>经度：'+temp1[1]+'</b>'+
      	'</div>'+
      	'</div>';
	
  	var contentString2 = '<div id="content">'+
      	'<h1 id="firstHeading" class="firstHeading">end point</h1>'+
      	'<div id="bodyContent">'+
      	'<p><b>纬度：'+temp2[0]+'</b>'+
      	'<p><b>经度：'+temp2[1]+'</b>'+
      	'</div>'+
      	'</div>';
	
  	infowindow1.set('content',contentString1);
  	infowindow2.set('content',contentString2);
	
}

function fcgiPost(query)
{
	ajaxFcgi=GetXmlHttpObject();
	if(ajaxFcgi==null)
	{
		alert("您的浏览器不支持,AJAX")
		return;
	}
	var url="RRR.fcgi?";
	url=url+query;
	ajaxFcgi.onreadystatechange=stateChanged;
	ajaxFcgi.open("POST",url,true);
	ajaxFcgi.send(url);
}
function stateChanged()
{
	if(ajaxFcgi.readyState==4)
	{
//		alert(ajaxFcgi.responseText);
		drawroute(ajaxFcgi.responseText);
		var rst = ajaxFcgi.responseText.split("\n");
		drawedges(rst[0]);
		//drawedgesFake(rst[1]);
		showroadname(rst[0]);

	}
	else {
//		alert(ajaxFcgi.readyState);
	}
}
function GetXmlHttpObject()//该函数的作用是解决为不同浏览器创建不同的 XMLHTTP 对象的问题
{
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

/*function animateCircle(route) {
    var count = 0;
    offsetId = window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = route.get('icons');
      icons[0].offset = (count / 2) + '%';
      route.set('icons', icons);
  }, 20);
}*/

function drawroute(responseText){

	var rst = responseText.split("\n");
	responseText = rst[0];

	var strs = responseText.split(" ");
	var Coordinates = new Array();
	var Coordinates1 = new Array();
	for(var i = 0;i<strs.length;i++)
	{
		var temp = strs[i].split(",");
		Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
		Coordinates1.push(new BMap.Point(parseFloat(temp[1]),parseFloat(temp[0])));
	}
	
	
	//设置百度地图上hana动画路线
	routePath_baidu.setPath(Coordinates1);
	map_baidu.addOverlay(routePath_baidu);
	map_baidu.setViewport(Coordinates1);
	
	//设置谷歌地图上hana动画路线
	routePath.setPath(Coordinates);
  	routePath.setMap(map);
  	//var obj = routePath.get('path');
	//alert(obj[0]);
  	//animateCircle(routePath);
  	
  	//设置谷歌地图上hana动画图标
  	pathsnum=Coordinates.length;
  	carhgm.setMap(map);
    carhgm.set('position',Coordinates[0]);	
    i=0;
    function resetMkPoint(i){
 		carhgm.set('position',Coordinates[i]);
 		if(i < pathsnum){
 			setTimeout(function(){
 				i++;
 				resetMkPoint(i);
 			},60);
 		}
 	}
 	setTimeout(function(){
 		resetMkPoint(0);
 	},60);
 	
 	//设置百度地图上hana动画图标
 	paths = Coordinates1.length;
 	carhbm.setPosition(Coordinates1[0]);
 	map_baidu.addOverlay(carhbm);
 	j=0;
 	function resetMkbPoint(j){
 		carhbm.setPosition(Coordinates1[j]);
 		if(i < paths){
 			setTimeout(function(){
 				j++;
 				resetMkbPoint(j);
 			},60);
 		}
 	}
 	setTimeout(function(){
 		resetMkbPoint(0);
 	},60);
 	
  	
  	//directionsDisplay.setMap(null);
  	//googleroutePath.setMap(null);
  	//map_baidu.removeOverlay(baiduroutePath);
	//baiduroutePath.setMap(null);
}

function drawedge(Coordinates, Coordinates1, state){
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
    	strokeWeight: 8,
    	});
	routePathi.setPath(Coordinates);
  	routePathi.setMap(map);
  	routePath_con.push(routePathi);
  	var routePath_baidui = new BMap.Polyline(null,{
    	//path: Coordinates,
    	strokeColor: color,
    	strokeOpacity: 1,
    	strokeWeight: 8,
  	});
  	routePath_baidui.setPath(Coordinates1);
	map_baidu.addOverlay(routePath_baidui);
	routePath_baidu_con.push(routePath_baidui);
}

function drawedges(responseText){
	var strs = responseText.split(" ");
	for(var i = 0;i<strs.length-1;i++)
	{	
		var Coordinates = new Array();
		var Coordinates1 = new Array();
		var temp = strs[i].split(",");
		Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
		Coordinates1.push(new BMap.Point(parseFloat(temp[1]),parseFloat(temp[0])));
		temp = strs[i+1].split(",");
		Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
		Coordinates1.push(new BMap.Point(parseFloat(temp[1]),parseFloat(temp[0])));
		var state = temp[2];
		//if(state != 3) {
		drawedge(Coordinates, Coordinates1, state);
		//drawedgebaidu(Coordinates1, state);
		//}
	}	
}

function drawedgesFake(responseText){
	var strs = responseText.split(" ");
	for(var i = 0;i<strs.length-1;i=i+2)
	{	
		var Coordinates = new Array();
		var Coordinates1 = new Array();
		var temp = strs[i].split(",");
		Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
		Coordinates1.push(new BMap.Point(parseFloat(temp[1]),parseFloat(temp[0])));
		temp = strs[i+1].split(",");
		Coordinates.push(new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])));
		Coordinates1.push(new BMap.Point(parseFloat(temp[1]),parseFloat(temp[0])));
		var state = temp[2];
		//if(state != 3) {
		drawedge(Coordinates, Coordinates1, state);
		//drawedgebaidu(Coordinates1, state);
		//}
	}	
}
function showroadname(result)
{
	var s = "";
	var strs = result.split(" ");
	var pre = "";
	var count = 0;
	var lastline = strs[strs.length-1].split(",");
	var distance = lastline[4].split("k");
	var time = lastline[5].split(".");
	s = s+"<h1 style=\"margin:0;padding:10px 0 9px 7px;font:bold 16px arial,sans-serif\"> Real-time Route Recommendation</h1>"
	s = s+"<div class=\"barDiv2\"></div>";
	s = s+"<div style=\"text-align: center;\">Distance: "+parseFloat(distance[0]).toFixed(2)+"km, Time: "+parseInt(time[0])+"min</div>";
	s = s+"<div class=\"barDiv2\"></div>";
	s = s+"<div><div style=\"cursor:pointer;background:url(http://api.map.baidu.com/img/trans_icons.png) no-repeat 5px 5px;padding:8px 0 8px 33px;line-height:15px\"><span style=\"white-space:nowrap\">Start</span></div></div>";
	s = s+"<div class=\"barDiv2\"></div>";
    for (var i = 1; i < strs.length; i ++){
    	var temp = strs[i].split(",");
    	if(temp[3] != pre && temp[3] != "noname") {
    		count = count+1;
        	s = s+"<li><a id=\""+count+"\" onclick=\"select(this)\">"+(count) + ". Enter " + temp[3]+"</a></li>";
        	s = s+"<div class=\"barDiv2\"></div>";
        	pre = temp[3];
        }
    }
    s = s+"<div style=\"cursor:pointer;background:url(http://api.map.baidu.com/img/trans_icons.png) no-repeat 5px -21px;padding:8px 0 8px 33px;line-height:15px\"><span style=\"white-space:nowrap\">End</span></div>";
    s = s+"<div class=\"barDiv2\"></div>";
    document.getElementById("hana").innerHTML = "<ul id=\"nav\">"+s+"</ul>";
}

/*function removeedges()
{
	var lengt = routePath_con.length;
	for(var i = lengt-1;i >= 0;i --)
	{
		routePath_con[i].setMap(null);
		routePath_con.pop();
		map_baidu.removeOverlay(routePath_baidu_con[i]);
		routePath_baidu_con.pop();
	}
	var lengtg = googleroutePath_con.length;
	for(var j = lengtg-1;j >= 0;j --)
	{
		googleroutePath_con[j].setMap(null);
		googleroutePath_con.pop();
	}
	var lengtb = baiduroutePath_con.length;
	for(var k = lengtb-1;k >= 0;k --)
	{
		map_baidu.removeOverlay(baiduroutePath_con[i]);
		baiduroutePath_con.pop();
	}
	
	googleroutePath.setMap(null);
  	map_baidu.removeOverlay(baiduroutePath);
  	carhgm.setMap(null);
  	carggm.setMap(null);
  	map_baidu.removeOverlay(carhbm);
  	map_baidu.removeOverlay(carbbm);
	
}*/
