# Router
### 1.sit   
* 每一页都有一个当前是第几页的属性 0，1，2，3，。。。。
* 在ajax获取到路由的页面时，给这个页面增加当前页的属性，也可以理解为页码。这是每个路由页面的** 唯一标识符 **。 
* 在创建属性对象的时候，（有一个 * pageBox * 用来存储所有的路由页面，pageBox.length 就作为nodeSit 标识符） 

### 2.beforePage
* 每一页有上一页的nodeSit标识符 -1, 0 ,1, 2, 3......
* 为当前的标识符-1。
* **判断一个页面是否为根页面，根据当前页面的beforePage 是否为-1，来判断。**

### 3.innerHtml
* 通过ajax获取的新页面的全文，*注意此处是字符串*
* *根页面没有这个属性*

### 4.node
* 会创建一个节点，把innerHtml 通过innerHTML插入进去，然后再从中选出class为Tsdy-router的元素。
* 不管什么页面路由只会显示该页面的以class为Tsdy-router为根元素的页面。 

### 5.nodeChild
* 这里的nodeChild指的是class="Tsdy-router"中class="router"的元素。

### 6.display
* false表示不显示 ，true表示显示，

    var Tsdy-Router = function() {
		//页面容器
		this.pageBox = []; 
}

    var router = new Tsdy-Router([
			['app.html', 'test.html']
		]
	)   //不传 false  默认true   false指不使用配套组件，true指使用配套组件。