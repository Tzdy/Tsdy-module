# Router
### 1.nodeSit   
* 每一页都有一个当前是第几页的属性 0，1，2，3，。。。。
* 在ajax获取到路由的页面时，给这个页面增加当前页的属性，也可以理解为页码。这是每个路由页面的** 唯一标识符 **。 
* 在创建属性对象的时候，（有一个 * pageBox * 用来存储所有的路由页面，pageBox.length 就作为nodeSit 标识符） 

### 2.beforePage
* 每一页有上一页的nodeSit标识符 -1, 0 ,1, 2, 3......
* 为当前的标识符-1。
* **判断一个页面是否为根页面，根据当前页面的beforePage 是否为-1，来判断。**

### 3.

    var Tsdy-Router = function() {
		//页面容器
		this.pageBox = []; 
}

    var router = new Tsdy-Router({
		url:[
			['./app.html','./test.html'],
			
		],
	})