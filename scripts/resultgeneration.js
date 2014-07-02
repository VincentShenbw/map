/**
 * @author 沈秉文
 */

var ajaxFcgi;
var CountRRR = 0;
var CountGoogle = 0;
var CountBaidu = 0;
var durationRRR = new Array();
var durationGoogle = new Array();
var durationBaidu = new Array();
var distanceRRR = new Array();
var distanceGoogle = new Array();
var distanceBaidu = new Array();
var directionsService = new google.maps.DirectionsService();

var searchComplete = function (results){
    if (driving.getStatus() != BMAP_STATUS_SUCCESS){
    	//distanceGoogle.push(-1);
      	//durationGoogle.push(-1);
    	return ;
    }

    var plan = results.getPlan(0);
    durationBaidu.push(plan.getDuration(true));                //获取时间
    distanceBaidu.push(plan.getDistance(true));             //获取距离
    CountBaidu++;
    PostBaiduRequest();
};

var driving = new BMap.DrivingRoute("北京", {onSearchComplete: searchComplete});

function PostBaiduRequest() {
	if (CountBaidu == Num/2) {
		return;
	}
	var p1 = new BMap.Point(parseFloat(locationy[CountBaidu*2]),parseFloat(locationx[CountBaidu*2]));
	var p2 = new BMap.Point(parseFloat(locationy[CountBaidu*2+1]),parseFloat(locationx[CountBaidu*2+1]));
	driving.search(p1, p2);
}

function PostRRRRequest() {
	//alert("ci");
	if (CountRRR == Num/2) {
		return;
	}
	var startq = locationx[CountRRR*2] + "," + locationy[CountRRR*2];
	var endq = locationx[CountRRR*2+1] + "," + locationy[CountRRR*2+1];
	//var settime=document.getElementById('settime').value;
	//var timeq="2009-05-01 16:26:10";
	//timeq=datetime_to_unix(timeq);
	var query = "query=" + startq + "," + endq + "," + "0" + "," + "1";// Format is: query=startx,starty,endx,endy,time
	fcgiPost(query);
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

function fcgiPost(query)
{
	ajaxFcgi=GetXmlHttpObject();
	if(ajaxFcgi==null)
	{
		alert("您的浏览器不支持,AJAX");
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
		//alert(ajaxFcgi.responseText);
		//drawroute(ajaxFcgi.responseText);
		var rst = ajaxFcgi.responseText.split("\n");
		//drawedges(rst[0]);
		//drawedgesFake(rst[1]);
		//GetRRRResult(rst[0]);
		
		var strs = rst[0].split(" ");
		var lastline = strs[strs.length-1].split(",");
		var distance = lastline[4].split("k");
		var time = lastline[5].split(".");

		//var s = parseFloat(distance[0]).toFixed(2)+"km, "+parseInt(time[0])+"min";
		//alert(s);
		
		durationRRR.push(time[0] + "分钟");
		distanceRRR.push(distance[0] + "公里");
		CountRRR++;
		PostRRRRequest();

	}
	else {
		//alert("State" + ajaxFcgi.readyState);
		//durationRRR.push(-1);
		//distanceRRR.push(-1);
	}
}

function GetRRRResult(result) {
	//var s = "";
	var strs = result.split(" ");
	//var pre = "";
	//var count = 0;
	var lastline = strs[strs.length-1].split(",");
	var distance = lastline[4].split("k");
	var time = lastline[5].split(".");

	var s = parseFloat(distance[0]).toFixed(2)+"km, "+parseInt(time[0])+"min";
	alert(s);
	//s = s+"<h1 style=\"margin:0;padding:10px 0 9px 7px;font:bold 16px arial,sans-serif\"> Real-time Route Recommendation</h1>"
	//s = s+"<div class=\"barDiv2\"></div>";
	//s = s+"<div style=\"text-align: center;\">Distance: "+parseFloat(distance[0]).toFixed(2)+"km, Time: "+parseInt(time[0])+"min</div>";
	//s = s+"<div class=\"barDiv2\"></div>";
	//s = s+"<div><div style=\"cursor:pointer;background:url(http://api.map.baidu.com/img/trans_icons.png) no-repeat 5px 5px;padding:8px 0 8px 33px;line-height:15px\"><span style=\"white-space:nowrap\">Start</span></div></div>";
	//s = s+"<div class=\"barDiv2\"></div>";
    //for (var i = 1; i < strs.length; i ++){
    	//var temp = strs[i].split(",");
    	//if(temp[3] != pre && temp[3] != "noname") {
    		//count = count+1;
        	//s = s+"<li><a id=\""+count+"\" onclick=\"select(this)\">"+(count) + ". Enter " + temp[3]+"</a></li>";
        	//s = s+"<div class=\"barDiv2\"></div>";
        	//pre = temp[3];
        //}
    //}
    //s = s+"<div style=\"cursor:pointer;background:url(http://api.map.baidu.com/img/trans_icons.png) no-repeat 5px -21px;padding:8px 0 8px 33px;line-height:15px\"><span style=\"white-space:nowrap\">End</span></div>";
    //s = s+"<div class=\"barDiv2\"></div>";
    //document.getElementById("hana").innerHTML = "<ul id=\"nav\">"+s+"</ul>";
	durationRRR.push(parseInt(time[0]));
	distanceRRR.push(parseFloat(distance[0]).toFixed(2));
	CountRRR++;
	PostRRRRequest();
}

function PostGoogleRequest() {
	if (CountGoogle == Num/2) {
		return;
	}
	else {
		var request = {
			origin:new google.maps.LatLng(parseFloat(locationx[CountGoogle*2]), parseFloat(locationy[CountGoogle*2])),
			destination:new google.maps.LatLng(parseFloat(locationx[CountGoogle*2+1]), parseFloat(locationy[CountGoogle*2+1])),
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		    	//alert("Google:" + response.routes[0].legs[0].distance.text + "," + response.routes[0].legs[0].duration.text);
		      	distanceGoogle.push(response.routes[0].legs[0].distance.text);
		      	durationGoogle.push(response.routes[0].legs[0].duration.text);
		      	CountGoogle++;
		      	PostGoogleRequest();
		    }
		    else {
		    	//distanceGoogle.push(-1);
		      	//durationGoogle.push(-1);
		    }
		});
	}
}

function PostResult() {
	if (distanceRRR.length==Num/2 && distanceGoogle.length==Num/2 && distanceBaidu.length==Num/2) {
		//alert("sdas");
		var table = document.getElementById("result");
		var rowLength = table.rows.length - 1;
		alert("已获取数据"+rowLength+"条，此次获取"+Num/2+"条");
		for(var i = 0; i < Num; i = i + 2){
			var newRow = table.insertRow(-1);
			var newCell1 = newRow.insertCell(-1);
			newCell1.innerText = rowLength + (i+2)/2; 
			var newCell2 = newRow.insertCell(-1);
			newCell2.innerText = locationx[i] + "," + locationy[i];
			var newCell3 = newRow.insertCell(-1);
			newCell3.innerText = locationx[i+1] + "," + locationy[i+1];
			var newCell4 = newRow.insertCell(-1);
			newCell4.innerText = distanceRRR[i/2] + ","+ durationRRR[i/2];
			var newCell5 = newRow.insertCell(-1);
			newCell5.innerText = distanceGoogle[i/2] + ","+ durationGoogle[i/2];
			var newCell6 = newRow.insertCell(-1);
			newCell6.innerText = distanceBaidu[i/2] + ","+ durationBaidu[i/2];
		}
		return;
	}
	window.setTimeout("PostResult()", 5000);
}