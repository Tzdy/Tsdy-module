(function() {
	var Tsdy_Router = window.Tsdy_Router = function(urlList, ...args) {
		this.router = [];
		this.page = 0;
		this,state = null;  //当前页面的url
		this.length = 0;
		this.urlList = urlList;
		this.init();
	}
	Tsdy_Router.prototype.ajax_get = function(url) {
		console.log(url);
		var obj = null;
		ajax_get(url, false, (xhr) => {
			obj = {   //虚拟dom的属性，
				sit: this.length,
				beforeSit: this.length - 1,
				innerHtml: xhr.responseText,
				node: null, 
				childNode: null,    //object
				display: false,
				returnPage:null,
				name:url
			}
		});
		var state = {
			title:"1",
			url:this.router[this.length - 1].name
		}
		console.log("url:",state.url);
		window.history.pushState(state,'1',url);
		this.state = window.history.state.url;    //获取当前url
		//--------------------伪url
		var div = document.createElement('div');  
		div.innerHTML = obj.innerHtml;
		var node = div.getElementsByClassName('Tsdy-router')[0];
		var script = node.querySelectorAll('script');
		for (var i = 0; i < script.length; i++) {
			var a = script[i].getAttribute('src');
			var scrnode = document.createElement('script');
			if (a) {
				scrnode.setAttribute('src', a);
			} else {
				scrnode.text = script[i].text;
			}
			script[i].parentNode.replaceChild(scrnode, script[i]);
		}
		var returnPage = document.createElement('div');   //返回按钮
		returnPage.className = "returnPage";
		returnPage.innerText = "返回";
		node.appendChild(returnPage);
		obj.returnPage = returnPage;
		obj.node = node;
		obj.childNode = node.getElementsByClassName('router');
		this.router.push(obj);
		this.addEvent();
		this.length++;
		this.updateOpen(obj);
		this.renderOpen();
		document.body.appendChild(obj.node); //sddsmvndskvjsljvsj

	}

	Tsdy_Router.prototype.init = function() {
		father = document.getElementsByClassName('Tsdy-router')[0];
		children = document.getElementsByClassName('router');
		var obj = {
			sit: 0,
			beforeSit: -1,
			node: father,
			childNode: children,
			display: true,
			name:'/'
		}
		this.renderOpen();
		this.router.push(obj);
		
		window.addEventListener('popstate',(e)=>{
			
			this.page = this.length;
			
			this.router.forEach((item,key) => {
				if(item.name == this.state){
					console.log(this.page," ",item.sit);
					if(item.sit == this.length - 2 ){
						this.removePage(this.length - 1);
						console.log("成功");
					}
				}
			})
		})
		this.addEvent();
		this.length++;
	}
	//放在length ++ 前
	Tsdy_Router.prototype.addEvent = function() {
		let nowLength = this.length
		if (this.router[this.length].childNode.length) {

			
			for (var i = 0; i < this.router[this.length].childNode.length; i++) {
				let j = i;
				this.router[nowLength].childNode[j].addEventListener('click', () => {
					this.ajax_get(this.urlList[nowLength][j]);
				})

			}
		} else {
			console.log("没了");
		}

		if(this.router[this.length].returnPage){
			let length = this.length;
			this.router[this.length].returnPage.addEventListener('click', ()=>{
				window.history.back();
			})
		}
	}


	Tsdy_Router.prototype.renderOpen = function() {
		for (var i = 0; i < this.length; i++) {
			if (this.router[i].display) {
				this.router[i].node.style.display = "block";
			} else {
				this.router[i].node.style.display = "none";
			}
		}
		
	}

	Tsdy_Router.prototype.updateOpen = function(node) {
		node.display = true;
		this.router[node.beforeSit].display = false;
	}
	
	Tsdy_Router.prototype.updateClose = function(node) {
		this.router[node.beforeSit].display = true;
	}
	
	Tsdy_Router.prototype.removePage = function(length) {
		document.body.removeChild(this.router[length].node);
		this.updateClose(this.router[length]);
		this.router.splice(length,1);
		this.length = length --;
		this.renderOpen();
		try{
			this.state = window.history.state.url;   //获取当前url
		}catch(e){
			//TODO handle the exception
		} 
		
	}
}());



// init => addEvent => ajax_get => 给虚拟addEvent
//								=> update刷新display
//								=> render根据display属性修改dom属性display
// 我在ajax_get中调用addEvent ,在addEvevt中调用ajax_get是有原因的