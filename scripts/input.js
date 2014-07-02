/**
 * @author 沈秉文
 */

//点击marker,显示POI信息，需要修改
function attachSecretMessage(marker, number) {
  var message = ["This","is","the","secret","message"];//poi信息
  var infowindow = new google.maps.InfoWindow(
      { content: message[number],
        size: new google.maps.Size(50,50)
      });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

//在地图上标记带动画的marker
function markpoint(point){
	var marker = new google.maps.Marker({
		draggable:true,
		animation: google.maps.Animation.DROP,
		position: point,
		title:""//POI名称
		});
	marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function(){
		if (marker.getAnimation() != null) {
    		marker.setAnimation(null);
  		} else {
    		marker.setAnimation(google.maps.Animation.BOUNCE);
  		}
	});
	//注册显示POI信息事件
}

//监听鼠标点击，隐藏自动补全框
function mouseClick(event)
{
    if (event.button==0|1|2|4&&event.srcElement.id!="seq"&&event.srcElement.id!="autostart"&&event.srcElement.id!="autoend")
      {
      var obj1 = document.getElementById("autostart");
      obj1.className = "auto_hidden";
      var obj2 = document.getElementById("autoend");
      obj2.className = "auto_hidden";
      }
}

//起点和终点反转
function invertion()
{
	var str1 = document.inputform.start.value;
	var str1_text = document.inputform.starttext.value;
	var str2 = document.inputform.end.value;
	var str2_text = document.inputform.endtext.value;
	document.inputform.start.value = str2;
	document.inputform.starttext.value = str2_text;
	document.inputform.end.value = str1;
	document.inputform.endtext.value = str1_text;
}

//实现自动补全功能
var $ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
}
var Bind = function(object, fun) {
    return function() {
        return fun.apply(object, arguments);
    }
}
function AutoComplete(obj,autoObj){//,arr){
    this.obj=$(obj);
    this.autoObj=$(autoObj);
    //this.value_arr=arr;
    this.index=-1;
    this.search_value="";
}
AutoComplete.prototype={

    init: function(){
        this.autoObj.style.left = this.obj.offsetLeft + "px";
        this.autoObj.style.top  = this.obj.offsetTop + this.obj.offsetHeight + "px";
        this.autoObj.style.width= this.obj.offsetWidth - 2 + "px";
    },
    
    deleteDIV: function(){
        while(this.autoObj.hasChildNodes()){
            this.autoObj.removeChild(this.autoObj.firstChild);
        }
        this.autoObj.className="auto_hidden";
    },
	
	setValue: function(_this,_i){
        return function(){
            _this.obj.value=this.seq;
            _this.autoObj.className="auto_hidden";
            //POI数据的经纬度进行mark
            if(_this.no==1){
            	//var point = new google.maps.LatLng(_this.pois_arr[_i].lat,_this.pois_arr[_i].lon);
            	//marker1.set('position', point);
				//marker1.setMap(map);
            	document.getElementById("start").value = _this.pois_arr[_i].lat+","+_this.pois_arr[_i].lon;
            	//alert(point);
            }
            else{
            	//var point = new google.maps.LatLng(_this.pois_arr[_i].lat,_this.pois_arr[_i].lon);
            	//marker2.set('position', point);
				//marker2.setMap(map);
            	document.getElementById("end").value = _this.pois_arr[_i].lat+","+_this.pois_arr[_i].lon;
            	//alert(point);
            }
        }       
    },

    autoOnmouseover: function(_this,_div_index){
        return function(){
            _this.index=_div_index;
            var length = _this.autoObj.children.length;
            for(var j=0;j<length;j++){
                if(j!=_this.index ){       
                    _this.autoObj.childNodes[j].className='auto_onmouseout';
                }else{
                    _this.autoObj.childNodes[j].className='auto_onmouseover';
                }
            }
        }
    },

    changeClassname: function(length){
        for(var i=0;i<length;i++){
            if(i!=this.index ){       
                this.autoObj.childNodes[i].className='auto_onmouseout';
            }else{
                this.autoObj.childNodes[i].className='auto_onmouseover';
                this.obj.value=this.autoObj.childNodes[i].seq;
            }
        }
    },

    pressKey: function(event){
        var length = this.autoObj.children.length;
        
        if(event.keyCode==40){
            ++this.index;
            if(this.index>length){
                this.index=0;
            }else if(this.index==length){
                this.obj.value=this.search_value;
            }
            this.changeClassname(length);
        }

        else if(event.keyCode==38){
            this.index--;
            if(this.index<-1){
                this.index=length - 1;
            }else if(this.index==-1){
                this.obj.value=this.search_value;
            }
            this.changeClassname(length);
        }

        else if(event.keyCode==13){
            this.autoObj.className="auto_hidden";
            this.index=-1;
            //敲击完回车键之后，从POI数据里进行搜索，因此这里还需要发送一次数据
            
            //返回POI搜索结果（暂不考虑候选结果的选择），设置地图上的点
            var point = new google.maps.LatLng(39.949, 116.398);//POI经纬度
            markpoint(point);
        }else{
            this.index=-1;
        }
    },

    start: function(event){
        if(event.keyCode!=13&&event.keyCode!=38&&event.keyCode!=40){
            this.init();
            this.deleteDIV();
            this.search_value=this.obj.value;
			
            var valueArr=this.value_arr;
            //valueArr.sort();
            if(this.obj.value.replace(/(^\s*)|(\s*$)/g,'')==""){ return; }
            try{ var reg = new RegExp("(" + this.obj.value + ")","i");}
            catch (e){ return; }
            var div_index=0;
            for(var i=0;i<valueArr.length;i++){
                if(reg.test(valueArr[i])){
                    var div = document.createElement("div");
                    div.id="seq";
                    div.className="auto_onmouseout";
                    div.seq=valueArr[i];
                    div.onclick=this.setValue(this,i);
                    div.onmouseover=this.autoOnmouseover(this,div_index);
                    div.innerHTML=valueArr[i].replace(reg,"<strong>$1</strong>");
                    this.autoObj.appendChild(div);
                    this.autoObj.className="auto_show";
                    div_index++;
                }
            }
        }
        this.pressKey(event);
        window.onresize=Bind(this,function(){this.init();});
    }
}