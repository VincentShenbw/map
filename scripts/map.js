/**
 * @author 沈秉文
 */

var directionsService = new google.maps.DirectionsService();

function RoadControl(controlDiv) {

  	// Set CSS styles for the DIV containing the control
  	// Setting padding to 5 px will offset the control
  	// from the edge of the map
  	controlDiv.style.padding = '5px';

  	// Set CSS for the control border
  	var controlUI = document.createElement('div');
  	controlUI.style.backgroundColor = 'white';
  	controlUI.style.borderStyle = 'solid';
  	controlUI.style.borderWidth = '2px';
  	controlDiv.appendChild(controlUI);

	// 不显示路况部分
  	// Set CSS for the control interior
  	//var controlText = document.createElement('div');
  	//controlText.style.width = '263px';
  	//controlText.style.height = '25px';
  	//controlText.style.paddingLeft = '4px';
  	//controlText.style.paddingRight = '4px';
  	//controlText.style.background = 'url(image/road.jpg) no-repeat';
  	//controlUI.appendChild(controlText);

}

function initialize(){
	var winHeight=0;
	//获取窗口高度
	if (window.innerHeight) {
		winHeight = window.innerHeight;
	}
	else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight;
	}
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		winHeight=document.documentElement.clientHeight;
	}
	if (document.getElementById("Siderbar")) {
		document.getElementById("Siderbar").style.height = (winHeight-110) + "px";
	}
	if (document.getElementById("Content")) {
		document.getElementById("Content").style.height = (winHeight-110) + "px";
	}
	
	//设置选项卡高度
	if (document.getElementById("wrap")&&(document.getElementById("Siderbar"))) {
		document.getElementById("wrap").style.height = (document.getElementById("Siderbar").clientHeight - 230) + "px";
		//tab_c
		var tab_c = document.getElementById("tab_c");
        var tab_c_li = tab_c.getElementsByTagName("div");
        var len = tab_c_li.length;
        var i = 0;
        for(i = 0;i<len;i++)
        {
        	tab_c_li[i].style.height = (document.getElementById("Siderbar").clientHeight - 300) + "px";
        }
	}
	
	directionsDisplay = new google.maps.DirectionsRenderer();
	
	
    var myLatlng = new google.maps.LatLng(39.90403, 116.40752599999996);
    var mapOptions = {
        center: myLatlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true,
        scaleControlOptions: {
        	position: google.maps.ControlPosition.LEFT_BOTTOM,
    	}
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    //路况
    /*var trafficLayer = new google.maps.TrafficLayer();
  	trafficLayer.setMap(map);*/
    
    // Create the DIV to hold the control and
  	// call the RoadControl() constructor passing
  	// in this DIV.
  	var roadControlDiv = document.createElement('div');
  	var roadControl = new RoadControl(roadControlDiv);

  	roadControlDiv.index = 1;
  	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(roadControlDiv);
  	
  	
  	marker1 = new google.maps.Marker({
      	draggable:true,
		animation: google.maps.Animation.DROP,
      	title: 'start point'
  	});
  	google.maps.event.addListener(marker1, 'click', function(){
		if (marker1.getAnimation() != null) {
    		marker1.setAnimation(null);
  		} else {
    		marker1.setAnimation(google.maps.Animation.BOUNCE);
  		}
	});
	
	
	marker2 = new google.maps.Marker({
      	draggable:true,
		animation: google.maps.Animation.DROP,
      	title: 'end point'
  	});
  	google.maps.event.addListener(marker2, 'click', function(){
		if (marker2.getAnimation() != null) {
    		marker2.setAnimation(null);
  		} else {
    		marker2.setAnimation(google.maps.Animation.BOUNCE);
  		}
  		//infowindow2.open(map,marker2);
	});
	
	infowindow1 = new google.maps.InfoWindow({});
  	
  	infowindow2 = new google.maps.InfoWindow({});
  	
  	google.maps.event.addListener(marker1, 'click', function(){
		infowindow1.open(map,marker1);
	});
	
	google.maps.event.addListener(marker2, 'click', function(){
		infowindow2.open(map,marker2);
	});
	
	
	marker_baidu1 = new BMap.Marker(null,{
		enableDragging: true,
		raiseOnDrag: true,
		title: 'start point',});
		
	marker_baidu2 = new BMap.Marker(null,{
		enableDragging: true,
		raiseOnDrag: true,
		title: 'end point',});
	
	/*var lineSymbol = {
  		path: google.maps.SymbolPath.CIRCLE,
    	scale: 8,
    	strokeColor: '#272727'
  	};
  	
  	var lineSymbol1 = {
  		path: google.maps.SymbolPath.CIRCLE,
    	scale: 8,
    	strokeColor: '#FF00D2'
  	};*/
  	
  	
  	var image1 = 'image/car2.png';
  	
  	carggm = new google.maps.Marker({
  		icon: image1,
  		draggable:false,
		animation: google.maps.Animation.DROP,
  	});
  	
  	var image2 = 'image/car1.png';
  	
  	carhgm = new google.maps.Marker({
  		icon: image2,
  		draggable:false,
		animation: google.maps.Animation.DROP,
  	});
  	
  	var myIcon1 = new BMap.Icon("image/car3.png", new BMap.Size(32, 32), { //小车图片
  		imageOffset: new BMap.Size(0, 0),
  		});
  		
  	carbbm = new BMap.Marker(null,{icon:myIcon1});
  	
  	var myIcon2 = new BMap.Icon("image/car1.png", new BMap.Size(32, 32), { //小车图片
  		imageOffset: new BMap.Size(0, 0),
  		});
  		
  	carhbm = new BMap.Marker(null,{icon:myIcon2});
 
  
  	routePath = new google.maps.Polyline({
    	//path: Coordinates,
    	strokeColor: "#272727",
    	strokeOpacity: 0.7,
    	strokeWeight: 5,
    	visible: false,
    	/*icons: [{
    		icon: lineSymbol,
    		offset: '100%'
    	}],*/
  	});
  	
  	routePath_baidu = new BMap.Polyline(null,{
    	//path: Coordinates,
    	strokeColor: "#272727",
    	strokeOpacity: 0.7,
    	strokeWeight: 5,
  	});
  	
  	baiduroutePath = new BMap.Polyline(null,{
    	//path: Coordinates,
    	strokeColor: "#FF0080",
    	strokeOpacity: 0.7,
    	strokeWeight: 5,
  	});

  	//var myIcon = new BMap.Icon("http://dev.baidu.com/wiki/static/map/API/examples/images/Mario.png",{width:32,height:32},{anchor:new BMap.Size(16,32)});
  	
  	googleroutePath = new google.maps.Polyline({
    	//path: Coordinates,
    	strokeColor: "#FF00D2",
    	strokeOpacity: 0.7,
    	strokeWeight: 5,
    	visible: false,
    	/*icons: [{
    		icon: lineSymbol1,
    		offset: '100%'
    	}],*/
  	});
  	
  	routePath_con = new Array();
  	
  	googleroutePath_con = new Array();
  	
  	routePath_baidu_con = new Array();
  	
  	baiduroutePath_con = new Array();
  	
  	/*carMk = new google.maps.Marker({
      			draggable:false,
				animation: google.maps.Animation.DROP,
  			});*/
  	
  	
  	//directionsDisplay.setMap(map);
  	directionsDisplay.setPanel(document.getElementById('google'));
  	driving = new BMap.DrivingRoute("北京", {renderOptions: {panel: "baidu", autoViewport: true}});
  	
  	
  	//初始化右键菜单，在初始化地图中一并初始化了。   
    var ContextMenuControlDiv = document.createElement('DIV');   
    var ContextMenuControl = new createContextMenu(ContextMenuControlDiv, map);   
  
    ContextMenuControlDiv.index = 1;   
    /*增加层的方式*/  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(ContextMenuControlDiv);
    
    
    //baidu map
    map_baidu = new BMap.Map("map_canvas_baidu");
	map_baidu.centerAndZoom(new BMap.Point(116.184, 40.025), 12);     // 初始化地图,设置中心点坐标和地图级别
	map_baidu.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
	map_baidu.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
	map_baidu.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
	map_baidu.enableScrollWheelZoom();                            //启用滚轮放大缩小
	map_baidu.addControl(new BMap.MapTypeControl());          //添加地图类型控件
	map_baidu.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    
  
//实现info window    
    /*var contentString = '<div id="content">'+
      	'<div id="siteNotice">'+
      	'</div>'+
      	'<h1 id="firstHeading" class="firstHeading">北京市</h1>'+
      	'<div id="bodyContent">'+
      	'<p><b>北京市</b>'+
      	'<p>Attribution: 北京市, <a href="http://baike.baidu.com/view/2621.htm">'+
      	'http://baike.baidu.com/view/2621.htm</a> '+
      	'</div>'+
      	'</div>';

  	var infowindow = new google.maps.InfoWindow({
      	content: contentString
  	});

  	var marker = new google.maps.Marker({
      	position: myLatlng,
      	map: map,
      	title: '北京市'
  	});
  	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map,marker);
  	});*/
}


/*创建右键菜单*/  
function createContextMenu(controlUI,map) {
    var contextmenu = document.createElement("div");   
    contextmenu.style.display = "none";   
    contextmenu.style.background = "#ffffff";   
    contextmenu.style.border = "10px solid #FFFFFF";
    contextmenu.innerHTML =    
    "<a href='javascript:choosestart()'><div class='context' style='margin-bottom:5px'> 以此为起点 </div></a>"
    + "<a href='#' onclick='javascript:chooseend()'><div class='context'> 以此为终点 </div></a>";   
    controlUI.appendChild(contextmenu);   
    /*给整个地图增加右键事件监听*/  
    google.maps.event.addDomListener(map, 'rightclick', function (event) {   
  
        // 起始 方法详细内容   
        //$O("info").innerText = event.latLng.lat()+"\n"+event.latLng.lng();   
        //var ss = "\n\n";   
        //for(var e in event.pixel)   
            //ss = ss+ e+":"+event.pixel[e]+"\n";   
        //$O("info").innerText = $O("info").innerText+ ss;
        document.getElementById("pointhide").value = event.latLng.lat() + "," + event.latLng.lng();
        //结束 方法详细内容   
  
        contextmenu.style.position="relative";   
        contextmenu.style.left=(event.pixel.x-80)+"px"; //平移显示以对应右键点击坐标   
        contextmenu.style.top=event.pixel.y+"px";   
        contextmenu.style.display = "block"; 
    });   
    /*点击菜单层中的某一个菜单项，就隐藏菜单*/  
    google.maps.event.addDomListener(controlUI, 'click', function () {   
        contextmenu.style.display = "none";   
    });   
       
    google.maps.event.addDomListener(map, 'click', function () {   
        contextmenu.style.display = "none";   
    });   
    google.maps.event.addDomListener(map, 'drag', function () {   
        contextmenu.style.display = "none";   
    });   
  
}

function choosestart()
{
	document.getElementById("start").value = document.getElementById("pointhide").value;
	var startq=document.getElementById('start').value;
	var temp1 = startq.split(",");
	marker1.set('position',new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])));
	marker1.setMap(map);
	
	//routePath.setMap(null);
	//directionsDisplay.setMap(null);
	//baiduroutePath.setMap(null);
	
	removehana();
	removegoogle();
	removebaidu();
}

function chooseend(lat,lng)
{
	document.getElementById("end").value = document.getElementById("pointhide").value;
	var endq=document.getElementById('end').value;
	var temp2 = endq.split(",");
	marker2.set('position',new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])));
	marker2.setMap(map);
	
	//routePath.setMap(null);
	//directionsDisplay.setMap(null);
	//baiduroutePath.setMap(null);
	removehana();
	removegoogle();
	removebaidu();
}


function googlecalcRoute() {
	//removeedges();
	removehana();
	document.getElementById("map_canvas").style.display = "block";
	document.getElementById("map_canvas_baidu").style.display = "none";
  	var start = document.getElementById('start').value;
  	var end = document.getElementById('end').value;
  
  	var temp1 = start.split(",");
	var temp2 = end.split(",");
	
	marker1.set('position',new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])));
	marker1.setMap(map);
	
	marker2.set('position',new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])));
	marker2.setMap(map);
	
	map.setCenter(new google.maps.LatLng((parseFloat(temp1[0])+parseFloat(temp2[0]))/2, (parseFloat(temp1[1])+parseFloat(temp2[1]))/2));
	map.setZoom(12);
	
	//directionsDisplay.setMap(map);
	googleroutePath.setMap(map);
	//carMk.setMap(null);

  	var request = {
      	origin:new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])),
      	destination:new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])),
      	travelMode: google.maps.DirectionsTravelMode.DRIVING
  	};
  	directionsService.route(request, function(response, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(response);
      		
      		var Coordinates = new Array();
      		
      		var temp = response.routes[0].overview_path;
      		//alert(temp.length);
      		for(var j = 0;j<temp.length;j++)
      		{
      			Coordinates.push(new google.maps.LatLng((temp[j].lat()), (temp[j].lng())));
      		}	
      		//}
      		
      		googleroutePath.setPath(Coordinates);
      		
      		carggm.setMap(map);
      		carggm.set('position',Coordinates[0]);
      		i=0;
      		pathsnum=Coordinates.length;
 			function resetMkPoint(i){
 				carggm.set('position',Coordinates[i]);
 				if(i < pathsnum){
 					setTimeout(function(){
 						i++;
 						resetMkPoint(i);
 					},150);
 				}
 				/*if(i==pathsnum)
 				{
 					setTimeout(function(){
 						i=0;
 						resetMkPoint(i);
 					},100);
 				}*/
 			}
 			setTimeout(function(){
 				resetMkPoint(0);
 				//console.log(i);
 			},150);
			

  			//googleroutePath.setMap(map);
  			//animateCircle(googleroutePath);
  			
  			var query = "query=google";
  			for(var k = 0;k<Coordinates.length;k++)
      		{
      			query = query + "," + Coordinates[k].lat() + "," + Coordinates[k].lng();
      		}
  			roadcondition(query);
    	}
  	});
}

function baiducalcRoute () {
	removehana();
	//removeedges();
	//map_baidu.removeOverlay(baiduroutePath);
	//map_baidu.removeOverlay(lushu);
	document.getElementById("map_canvas").style.display = "none";
	document.getElementById("map_canvas_baidu").style.display = "block";
	//map_baidu = new BMap.Map("map_canvas_baidu");
	//map_baidu.addControl(new BMap.NavigationControl()); 
	
	
	var start = document.getElementById('start').value;
  	var end = document.getElementById('end').value;
  	var temp1 = start.split(",");
	var temp2 = end.split(",");
	
	//坐标转换完之后的回调函数
	/*translateCallback = function (point){
    	var marker = new BMap.Marker(point);
    	bm.addOverlay(marker);
    	var label = new BMap.Label("我是百度标注哦",{offset:new BMap.Size(20,-10)});
    	marker.setLabel(label); //添加百度label
    	bm.setCenter(point);
    	alert(point.lng + "," + point.lat);
	
	
	}
	
	BMap.Convertor.translate(ggPoint,2,translateCallback);     //GCJ-02坐标转成百度坐标*/
	
  	var p1 = new BMap.Point(parseFloat(temp1[1]),parseFloat(temp1[0]));
	var p2 = new BMap.Point(parseFloat(temp2[1]),parseFloat(temp2[0]));
	
	marker_baidu1.setPosition(p1);
	marker_baidu2.setPosition(p2);
	
	map_baidu.addOverlay(marker_baidu1);
	map_baidu.addOverlay(marker_baidu2);
	
	//BMap.Convertor.translate(p1,2,function(point){});
	
	

	//mapbaidu = new BMap.Map("map_canvas");
	
	//map_baidu = new BMap.Map("map_canvas_baidu");
	//map_baidu.addControl(new BMap.NavigationControl());
	
	//var driving = new BMap.DrivingRoute("北京", {renderOptions: {panel: "baidu", autoViewport: true}});
	driving.search(p1, p2);
	
	
	//var myIcon = new BMap.Icon("http://dev.baidu.com/wiki/static/map/API/examples/images/Mario.png",{width:32,height:32},{anchor:new BMap.Size(16,32)});
	
	//baiduroutePath.setMap(map);
	map_baidu.removeOverlay(baiduroutePath);
	//map_baidu.removeOverlay(carMkb);
	//var driving1 = new BMap.DrivingRoute("北京"); //驾车实例
 	//driving1.search(p1, p2);
 	driving.setSearchCompleteCallback(function(){
 		
 		//map_baidu.clearOverlays();
 		//baiduroutePath.dispose();
 		
 		var pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组
 		
		paths = pts.length; //获得有几个点
		baiduroutePath.setPath(pts); //= new BMap.Polyline(pts, {strokeColor: '#111'});
		map_baidu.addOverlay(baiduroutePath);
		map_baidu.setViewport(pts);
		//carMkb = new BMap.Marker(pts[0],{icon:myIcon});
		carbbm.setPosition(pts[0]);
 		map_baidu.addOverlay(carbbm);
 		i=0;
 		function resetMkPoint(i){
 			carbbm.setPosition(pts[i]);
 			if(i < paths){
 				setTimeout(function(){
 					i++;
 					resetMkPoint(i);
 				},100);
 			}
 		}
 		setTimeout(function(){
 			resetMkPoint(0);
 		},100);
 		//map_baidu.removeOverlay(carbbm);
 		/*var query = "query=baidu";
  		for(var k = 0;k<pts.length;k++)
      	{
      		query = query + "," + pts[k].lat + "," + pts[k].lng;
      	}
  		roadcondition(query);*/
 		
		/*lushu = new BMapLib.LuShu(map_baidu,pts,{
			defaultContent:"百度路线",
			speed:4500,
			icon:myIcon,
			});*/
			
		//lushu.start();
 		//function animatePic(lushu) {
			//lushu.start();
			//alert("jk");
			//offsetId = window.setInterval(function() {
				//lushu.start();
			//}, 15000);
		//}
 		
 		//animatePic(lushu);
 		
 		/*paths = pts.length; //获得有几个点
 		//alert(paths);
 		var Coordinates = new Array();
 		for(i = 0; i < paths;i++)
		{
			Coordinates.push(new google.maps.LatLng((pts[i].lat-0.006), (pts[i].lng-0.0065)));
		}

  		baiduroutePath.setPath(Coordinates);
  		map.addOverlay(polyline);*/

  		//baiduroutePath.setMap(map);
  		//animateCircle(baiduroutePath);
 	});
  	
}

function comparewithgg()
{
	process();
	googlecalcRoutecmp();
}

function comparewithbd()
{
	process();
	baiducalcRoutecmp();
}

function removehana()
{
	//去除图标
	carhgm.setMap(null);
	map_baidu.removeOverlay(carhbm);
	//去除动画路线
	routePath.setMap(null);
	map_baidu.removeOverlay(routePath_baidu);
	//去除路况路线
	var lengt = routePath_con.length;
	for(var i = lengt-1;i >= 0;i --)
	{
		routePath_con[i].setMap(null);
		routePath_con.pop();
		map_baidu.removeOverlay(routePath_baidu_con[i]);
		routePath_baidu_con.pop();
	}
}

function removegoogle()
{
	//去除图标
	carggm.setMap(null);
	//去除动画路线
	googleroutePath.setMap(null);
	//去除路况路线
	var lengtg = googleroutePath_con.length;
	for(var j = lengtg-1;j >= 0;j --)
	{
		googleroutePath_con[j].setMap(null);
		googleroutePath_con.pop();
	}
}

function removebaidu()
{
	//去除图标
	map_baidu.removeOverlay(carbbm);
	//去除动画路线
	map_baidu.removeOverlay(baiduroutePath);
	//去除路况路线
	var lengtb = baiduroutePath_con.length;
	for(var k = lengtb-1;k >= 0;k --)
	{
		map_baidu.removeOverlay(baiduroutePath_con[i]);
		baiduroutePath_con.pop();
	}
}

function googlecalcRoutecmp() {
	document.getElementById("map_canvas").style.display = "block";
	document.getElementById("map_canvas_baidu").style.display = "none";
  	var start = document.getElementById('start').value;
  	var end = document.getElementById('end').value;
  
  	var temp1 = start.split(",");
	var temp2 = end.split(",");
	
	marker1.set('position',new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])));
	marker1.setMap(map);
	
	marker2.set('position',new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])));
	marker2.setMap(map);
	
	map.setCenter(new google.maps.LatLng((parseFloat(temp1[0])+parseFloat(temp2[0]))/2, (parseFloat(temp1[1])+parseFloat(temp2[1]))/2));
	map.setZoom(12);
	
	googleroutePath.setMap(map);

  	var request = {
      	origin:new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])),
      	destination:new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])),
      	travelMode: google.maps.DirectionsTravelMode.DRIVING
  	};
  	directionsService.route(request, function(response, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(response);
      		
      		var Coordinates = new Array();
      		
      		var temp = response.routes[0].overview_path;
      		for(var j = 0;j<temp.length;j++)
      		{
      			Coordinates.push(new google.maps.LatLng((temp[j].lat()), (temp[j].lng())));
      		}	
      		
      		googleroutePath.setPath(Coordinates);
      		
      		carggm.setMap(map);
      		carggm.set('position',Coordinates[0]);
      		i=0;
      		pathsnum=Coordinates.length;
 			function resetMkPoint(i){
 				carggm.set('position',Coordinates[i]);
 				if(i < pathsnum){
 					setTimeout(function(){
 						i++;
 						resetMkPoint(i);
 					},150);
 				}
 			}
 			setTimeout(function(){
 				resetMkPoint(0);
 				//console.log(i);
 			},150);
  			
  			var query = "query=google";
  			for(var k = 0;k<Coordinates.length;k++)
      		{
      			query = query + "," + Coordinates[k].lat() + "," + Coordinates[k].lng();
      		}
  			roadcondition(query);
    	}
  	});
}

function baiducalcRoutecmp() {
	document.getElementById("map_canvas").style.display = "none";
	document.getElementById("map_canvas_baidu").style.display = "block";
	
	var start = document.getElementById('start').value;
  	var end = document.getElementById('end').value;
  	var temp1 = start.split(",");
	var temp2 = end.split(",");
	
  	var p1 = new BMap.Point(parseFloat(temp1[1]),parseFloat(temp1[0]));
	var p2 = new BMap.Point(parseFloat(temp2[1]),parseFloat(temp2[0]));
	
	marker_baidu1.setPosition(p1);
	marker_baidu2.setPosition(p2);
	
	map_baidu.addOverlay(marker_baidu1);
	map_baidu.addOverlay(marker_baidu2);

	driving.search(p1, p2);
	
	map_baidu.removeOverlay(baiduroutePath);
 	driving.setSearchCompleteCallback(function(){
 		var pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组
 		
		paths = pts.length; //获得有几个点
		baiduroutePath.setPath(pts); //= new BMap.Polyline(pts, {strokeColor: '#111'});
		map_baidu.addOverlay(baiduroutePath);
		map_baidu.setViewport(pts);
		carbbm.setPosition(pts[0]);
 		map_baidu.addOverlay(carbbm);
 		i=0;
 		function resetMkPoint(i){
 			carbbm.setPosition(pts[i]);
 			if(i < paths){
 				setTimeout(function(){
 					i++;
 					resetMkPoint(i);
 				},100);
 			}
 		}
 		setTimeout(function(){
 			resetMkPoint(0);
 		},100);
 		
 	});
  	
}
