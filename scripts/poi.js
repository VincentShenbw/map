/**
 * @author 沈秉文
 */
var xmlHttpFcgistart;
var xmlHttpFcgiend;

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

function onkeyup1(){
    var query = document.getElementById("starttext").value;
    
    if(query.length == 0) {
        return;
    }
    query = "query=" + query;
    
    xmlHttpFcgistart = createXmlHttpRequest();
    if(xmlHttpFcgistart==null)
	{
		alert("您的浏览器不支持,AJAX");
		return;
	} 
    var url="server.fcgi?";
	url=url+query;
	xmlHttpFcgistart.onreadystatechange=stateChangedstart;
	xmlHttpFcgistart.open("POST",url,true);
	xmlHttpFcgistart.send(url);
}

function onkeyup2(){
    var query = document.getElementById("endtext").value;
    
    if(query.length == 0) {
        return;
    }
    query = "query=" + query;
    
    xmlHttpFcgiend = createXmlHttpRequest();
    if(xmlHttpFcgiend==null)
	{
		alert("您的浏览器不支持,AJAX");
		return;
	} 
    var url="server.fcgi?";
	url=url+query;
	xmlHttpFcgiend.onreadystatechange=stateChangedend;
	xmlHttpFcgiend.open("POST",url,true);
	xmlHttpFcgiend.send(url);
}      
      
//call back
function stateChangedstart()
{
	if(xmlHttpFcgistart.readyState==4)
	{
		var resultjson = xmlHttpFcgistart.responseText;
        showresultstart(resultjson);
	}
}

function stateChangedend()
{
	if(xmlHttpFcgiend.readyState==4)
	{
		var resultjson = xmlHttpFcgiend.responseText;
        showresultend(resultjson);
	}
}

function showresultstart(querys){
	var jsontext = querys;
    var answer = eval("("+jsontext+")");
    var tags = new Array();
    var pois = new Array();
	var query = document.getElementById("starttext").value;
	if(query.indexOf("清华") >= 0) {
		tags.push("清华大学");
		var ret = {'lat':'40.0003','lon':'116.3276'};
		pois.push(ret);
	}
	if(query.indexOf("SAP") >= 0) {
		tags.push("SAP思艾普");
		var ret ={'lat':'39.9067','lon':'116.4885'};
		pois.push(ret);
	}
    for(var i = 0; i < answer.answers.length; i++) {
    	//var autoCompletestart=new AutoComplete('start','autostart',['b0','b12','b22','b3','b4','b5','b6','b7','b8','b2','abd','ab','acd','accd','b1','cd','ccd','cbcv','cxf']);
    	tags.push(answer.answers[i].tag);
    	pois.push(fromMtoLL(answer.answers[i].x, answer.answers[i].y));
    }
    //var autoCompletestart=new AutoComplete('start','autostart',tags);
    autoCompletestart.value_arr = tags;
    autoCompletestart.pois_arr = pois;
    autoCompletestart.no = 1;
    autoCompletestart.start(event);
}

function showresultend(querys){
	var jsontext = querys;
    var answer = eval("("+jsontext+")");
    var tags = new Array();
    var pois = new Array();
	var query = document.getElementById("endtext").value;
	if(query.indexOf("清华") >= 0) {
		tags.push("清华大学");
		var ret = {'lat':'40.0003','lon':'116.3276'};
		pois.push(ret);
	}
	if(query.indexOf("SAP") >= 0) {
		tags.push("SAP思艾普");
		var ret ={'lat':'39.9067','lon':'116.4885'};
		pois.push(ret);
	}
    for(var i = 0; i < answer.answers.length; i++) {
    	//var autoCompletestart=new AutoComplete('start','autostart',['b0','b12','b22','b3','b4','b5','b6','b7','b8','b2','abd','ab','acd','accd','b1','cd','ccd','cbcv','cxf']);
    	tags.push(answer.answers[i].tag);
    	pois.push(fromMtoLL(answer.answers[i].x, answer.answers[i].y));
    }
    //var autoCompletestart=new AutoComplete('start','autostart',tags);
    autoCompleteend.value_arr = tags;
    autoCompleteend.pois_arr = pois;
    autoCompleteend.no = 2;
    autoCompleteend.start(event);
}

function startsearch(){
    var query = document.getElementById("starttext").value;
    
    if(query.length == 0) {
        return;
    }
    query = "query=" + query;
    
    xmlHttpFcgistart = createXmlHttpRequest();
    if(xmlHttpFcgistart==null)
	{
		alert("您的浏览器不支持,AJAX");
		return;
	} 
    var url="server.fcgi?";
	url=url+query;
	xmlHttpFcgistart.onreadystatechange=stateChangedstartsearch;
	xmlHttpFcgistart.open("POST",url,true);
	xmlHttpFcgistart.send(url);
}

function stateChangedstartsearch()
{
	if(xmlHttpFcgistart.readyState==4)
	{
		var resultjson = xmlHttpFcgistart.responseText;
    	var answer = eval("("+resultjson+")");
    	var ll = fromMtoLL(answer.answers[0].x, answer.answers[0].y);
    	document.getElementById("start").value = ll.lat+","+ll.lon;
	}
}

function endsearch(){
    var query = document.getElementById("endtext").value;
    
    if(query.length == 0) {
        return;
    }
    query = "query=" + query;
    
    xmlHttpFcgiend = createXmlHttpRequest();
    if(xmlHttpFcgiend==null)
	{
		alert("您的浏览器不支持,AJAX");
		return;
	} 
    var url="server.fcgi?";
	url=url+query;
	xmlHttpFcgiend.onreadystatechange=stateChangedendsearch;
	xmlHttpFcgiend.open("POST",url,true);
	xmlHttpFcgiend.send(url);
}

function stateChangedendsearch()
{
	if(xmlHttpFcgiend.readyState==4)
	{
		var resultjson = xmlHttpFcgiend.responseText;
    	var answer = eval("("+resultjson+")");
    	var ll = fromMtoLL(answer.answers[0].x, answer.answers[0].y);
    	document.getElementById("end").value = ll.lat+","+ll.lon;
	}
}
