/**
 * @author 沈秉文
 */

function winresize(){
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
		document.getElementById("wrap").style.height = (document.getElementById("Siderbar").clientHeight - 280) + "px";
		//tab_c
		var tab_c = document.getElementById("tab_c");
        var tab_c_li = tab_c.getElementsByTagName("div");
        var len = tab_c_li.length;
        var i = 0;
        for(i = 0;i<len;i++)
        {
        	tab_c_li[i].style.height = (document.getElementById("Siderbar").clientHeight - 350) + "px";
        }
	}
}

window.onresize = winresize;
