/**
 * @author 沈秉文
 */

//获取当前时间
function getTime() {
	var myDate = new Date(); //得到时间对象 
    var y = 1900+myDate.getYear(); //获取年 
    var m = myDate.getMonth() + 1; //获取月 
    m = m > 9 ? m : "0" + m;
    var d = myDate.getDate(); //获取日
    d = d > 9 ? d : "0" + d; 
    var h = myDate.getHours(); //获取小时 
    h = h > 9 ? h : "0" + h;  
    var M = myDate.getMinutes(); //获取分 
    M = M > 9 ? M : "0" + M; 
    var s = myDate.getSeconds(); //获取秒 
    s = s > 9 ? s : "0" + s;
    //var NowTime = y + "年" + m + "月" + d + "日" + " " + h + ":" + M + ":" + s; //串联字符串用于输入
    var NowTime = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s; //串联字符串用于输入
	//var FakeTime = "2014年1月17日 08:"+M+":"+s;
    document.getElementById("Time").innerText = NowTime.toLocaleString();
    //document.getElementById("Hour").innerText = FakeTime.toLocaleString();
	window.setTimeout("getTime()", 1000); //每隔1秒自动变换时间 
} 
