/*
 * author:jian
 * time:2016/9/11
 * name:startMove
 * description:
 * obj:操作对象
 * json:属性对象
 * endFn:执行的回调函数
 */
function startMove(obj,json,endFn){
		//执行之前清除上一次的定时器,让每一次的动画的都是新的
		clearInterval(obj.timer);
		//创建一个定时器
		obj.timer = setInterval(function(){
			//关闭动画开关
			var bBtn = true;
			//在json对象中查找需要执行的属性
			for(var attr in json){
				
				var iCur = 0;
				//透明度的动画效果
				if(attr == 'opacity'){
					
					if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
						iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
					}
					else{
						iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
					}	
				}
				else{
					iCur = parseInt(getStyle(obj,attr)) || 0;
				}
				//获取目标的终止值
				var target = json[attr];
				//
				var iSpeed = (target - iCur)/8;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=target){
					bBtn = false;
				}
				
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					obj.style.opacity = (iCur + iSpeed)/100;
					
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				
				
			}
			//判断动画是否执行完毕
			if(bBtn){
				//动画执行完毕的时候清除动画
				clearInterval(obj.timer);
				//执行回调函数，动画执行完毕时候执行的回调函数
				if(endFn){
					endFn.call(obj);
				}
			}
			
		},30);
	
	}
	
	//获取外部样式表的属性值
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];//兼容ie的写法
		}
		else{
			return getComputedStyle(obj,false)[attr];//兼容其他浏览器
		}
	}
	
