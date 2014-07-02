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

function roadsearch(points)
{
	xmlHttpFcgiroad = createXmlHttpRequest();
    if(xmlHttpFcgiroad==null)
	{
		alert("您的浏览器不支持,AJAX");
		return;
	} 
    var url="road.fcgi?";
    url = url + points;
	xmlHttpFcgiroad.onreadystatechange=stateChangedroad;
	xmlHttpFcgiroad.open("POST",url,true);
	xmlHttpFcgiroad.send(url);
}

//call back
function stateChangedroad()
{
	if(xmlHttpFcgiroad.readyState==4)
	{
		var result = xmlHttpFcgiroad.responseText;
        showresultroad(result);
	}
}

function showresultroad(result)
{
	var s = [];
	var str = result.split(" ");
    for (var i = 0; i < str.length; i ++){
        s.push((i + 1) + ". 进入" + str[i]);
      }
    document.getElementById("hana").innerHTML = s.join("<br/>");
}

