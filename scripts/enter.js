/**
 * @author 沈秉文
 */

//禁用Enter键表单自动提交  
document.onkeydown = function(event) {
	var target, code, tag;
	if(!event){
		event = window.event; //针对ie浏览器  
		target = event.srcElement;
		code = event.keyCode;
		if(code == 13){
			tag = target.tagName;
			if (tag == "TEXTAREA") { return true; }  
            else { return false; }  
        }  
    }  
    else {  
        target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
        code = event.keyCode;  
        if (code == 13) {  
            tag = target.tagName;  
            if (tag == "INPUT") { return false; }  
            else { return true; }   
        }  
    }  
};  
      
