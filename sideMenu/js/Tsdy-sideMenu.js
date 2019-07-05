(window.Tsdy_sideMenu = function () {
console.log(window);
var sideMenu = document.getElementsByClassName('Tsdy-sideMenu')[0];
var father = sideMenu.parentNode;
//sideMenu.movejudge = true;   //  觉定move能否执行
father.addEventListener('mousedown',function(e) {
	e.preventDefault();
})
console.log(father);
father.addEventListener('touchstart', function (e) {
	e.stopPropagation();
})
var judge = true;
sideMenu.addEventListener('webkitTransitionEnd', function () {
	console.log("123");
	if (this.classList.value.match('go-center')) {
		this.style.transform = "translate3d(0,0,0)";
	}
	this.className = "Tsdy-sideMenu";
	judge = true;
})
// sideMenu.onwebkittransitionend = function() {
//     console.log("123");
// 	if (this.classList.value.match('go-center')) {
// 		this.style.transform = "translate3d(0,0,0)";
// 	}
// 	this.className = "Tsdy-sideMenu";
// 	judge = true;
// }

father.addEventListener('touchstart', function (e) {
	console.log('fist' + e.touches[0].pageX);
	if (e.touches.length == 1) {
		var originX = e.touches[0].pageX;
		var dx = e.touches[0].pageX;  //let
		var dy = e.touches[0].pageY; // 
		var x = getComputedStyle(sideMenu).transform.replace("matrix(1, 0, 0, 1, ", "");
		x = x.replace(', 0)', "");
		var movejudge = false;
		sideMenu.style.transform = "translate3d(" + (parseInt(x) + e.touches[0].pageX - dx) + "px,0,0)";
		judge = false;
		sideMenu.className = "Tsdy-sideMenu";
		function move(e) {
			if(Math.abs(dy - e.touches[0].pageY)/Math.abs(dx - e.touches[0].pageX) < Math.sqrt(2)/3)
				movejudge = true;
			var x = getComputedStyle(sideMenu).transform.replace("matrix(1, 0, 0, 1, ", "");
			x = x.replace(', 0)', "");

			// sideMenu.style.transform = (x==0 || x == -window.screen.width?"translate3d("+x+",0,0)":"translate3d(" + (parseInt(x) + e.touches[0].pageX - dx) + "px,0,0)");
			if((parseInt(x) + e.touches[0].pageX - dx)<=-window.innerWidth){//范围判断
				sideMenu.style.transform = "translate3d(-100%,0,0)";
			}else if((parseInt(x) + e.touches[0].pageX - dx)>=0){
				sideMenu.style.transform = "translate3d(0,0,0)";
			}else if(movejudge){//移动判断
				sideMenu.style.transform = "translate3d(" + (parseInt(x) + e.touches[0].pageX - dx) + "px,0,0)";
			}
			dx = e.touches[0].pageX;
			
		}

		father.ontouchmove = function (e) {
			// e.preventDefault();
			//if(sideMenu.movejudge)
				move(e);
		};
		
		father.ontouchend = function () {
			
			var x = getComputedStyle(sideMenu).transform.replace("matrix(1, 0, 0, 1, ", "");
			x = x.replace(', 0)', "");
			console.log(parseInt(x));
			console.log(originX, dx);  //e.changedTouches[0].pageX，早期的ipad的safari的touchend回调后，touchstart中event.touches[0].pageX是会根据你触点的移动改变的
			
			father.removeEventListener('touchmove', move);
			console.log(parseInt(x));
			if (parseInt(x) > -window.innerWidth * 3 / 4 && originX - dx  <= 0) {
				//            划过1/4的距离                在触摸时记录  手拿起来时记录（可以判断划动方向）
				sideMenu.classList = "Tsdy-sideMenu go-center";
			} else if (parseInt(x) < -window.innerWidth / 4 && originX - dx >= 0) {
				sideMenu.classList = "Tsdy-sideMenu go-left";
			}
			//上面两个不满足，就判断下面两个，这里特指没有划过1/4的距离。
			else if (originX - dx <= 0) {
				sideMenu.classList = "Tsdy-sideMenu go-left";
			}
			else if(originX - dx >= 0){
				sideMenu.classList = "Tsdy-sideMenu go-center";
			}
			sideMenu.setAttribute('style',"");
			//可以先变class  在清楚style上的translate3d 就能实现在两个位置之间随意滑动，最后固定在其中一个位置上

			console.log("del");
		}
	}
})
if(document.getElementsByClassName('content')[0]){


document.getElementsByClassName('content')[0].ontouchstart = function (e) {
	var dx = e.touches[0].pageX;
	var dy = e.touches[0].pageY;
	var judge = 0;
	var num = 0;
	var x = document.getElementsByClassName('content')[0];
		document.getElementsByClassName('content')[0].ontouchmove = function (e) {
			if(!judge&&(dx != e.touches[0].pageX ||dy != e.touches[0].pageY)){
				
				if(Math.abs(e.touches[0].pageY - dy) > 10 && num == 0)
					num = 1;
				else
					num = 2;      
				judge = 1;        
			}
			console.log("move");
			if(num == 1){  //下拉
				console.log("stopPro");
				e.stopPropagation();
				console.log("stop");
			}
			else if(num == 2){ //侧栏
				e.preventDefault();
			}
		}
		document.getElementsByClassName('content')[0].ontouchend = function (e){
			judge = 0;
			num = 0;
		}
	} 
} 
});
