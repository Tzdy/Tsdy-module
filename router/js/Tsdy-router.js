(window.Tsdy_router = function() {   //执行
    function initLoading() {
        var loading = document.createElement('div');
        var img = document.createElement('img');
        img.src = "https://tzdy.github.io/Tsdy-module/router/img/loading.gif";
            loading.classList = "loading loading-off";
            loading.appendChild(img);
            document.body.appendChild(loading);
            var prevent = document.createElement('div');
            prevent.className = "prevent";
            document.body.appendChild(prevent);
            return [loading, prevent];   
    }

    function upLoading(loading) {
        loading[0].classList = "loading loading-up";
        loading_judge = false;
    }

    function offLoading(loading) {
        loading[0].parentNode.removeChild(loading[0]);
        loading[1].parentNode.removeChild(loading[1])
        loading_judge = true;
    }
// # loading图标的过程函数，每次执行ajax请求时，会在ajax函数中调用initLoading函数返回一个，loading元素数组，loading[0]为加载图标元素，loading[1]为一个大小为整个body的div元素用来防止用户在加载时点击其他地方,最后通过uploading和offloading实现一个加载中的感觉。
    function productgoPage(msg) {   //页面信息
        var node = document.createElement('div');
        if (typeof msg == "string") {
            //当使用ajax获取页面时，获取的是整个页面的字符串。
            //在返回或前进时，使用的是缓存中的元素，此时msg为元素
            node.innerHTML = String(msg);
            var main = node.getElementsByClassName('Tsdy-router')[0];
            node = main ? main : node;
            node.classList = "Tsdy-router right-to-center";
            return node;
        } else {
            msg.classList = "Tsdy-router right-to-center";
            return msg;
        }
    }
    
    function scriptActive(node) {
        //由于innerHTML的script标签是无法执行的。
        //node是所有你想使之可以重新执行的脚本的父元素
        var scr = node.getElementsByTagName('script');
        if(scr.length){
            for(let i = 0 ; i < scr.length ; i ++){
                let script = document.createElement('script');
                if(scr[i].getAttributeNames().length){
                    for(let j = 0 ; j < scr[i].getAttributeNames().length; j++){
                        script.setAttribute(scr[i].getAttributeNames()[j],scr[i].getAttribute(scr[i].getAttributeNames()[j]));
        
                    }
                    script.innerHTML = scr[i].innerHTML;
                }else{
                    script.innerHTML = scr[i].innerHTML;
                }
                scr[i].parentNode.replaceChild(script,scr[i]);
            }
        }

    }

    function abortAjax(xhr){
        //断开一个xhr请求
        loading_judge = true;
        xhr.abort();
    }

    function productbackPage(msg) {   //页面信息
        var node = document.createElement('div');
        if (typeof msg == "string") {
            node.innerHTML = String(msg);
            var main = node.getElementsByClassName('Tsdy-router')[0];
            node = main ? main : node;
            node.classList = "Tsdy-router left-to-center";
            return node;
        } else {
            msg.classList = "Tsdy-router left-to-center";
            return msg;
        }
    }

    function mounted(node, brother) {
        brother.parentNode.appendChild(node);
    }

    function pushList(node, url) {
        nodeList.push({
            node: node,
            sit: nodeList.length,
            url: url
        })      //外部的nodeList
    }

    function delPage(node) {
        node.parentNode.removeChild(node);
    }

    function restart(doc) {
        addlistener(doc);
    }

    function ajax(node, url, method) {   //node 谁在请求？
        var load = initLoading();
        ajaxObject = ts.ajax({
            async: true,
            url: url,
            method: method,
            success(msg) {
                offLoading(load);
                var page = productgoPage(msg.responseText);  //virtual 中
                mounted(page, node);
                pushState(url);   //先执行这个，再执行pushlist注意！
                spliceNodeList();
                pushList(page, url);
                setTimeout(() => {
                    delPage(node);
                    scriptActive(page);
                    restart(document);
                }, 400);
            },
            failure() {
                offLoading(load);
            },
            loading() {
                upLoading(load);
            },
            end() {}
        })
    }

    function addlistener(doc) {
        var fatherNode = doc.getElementsByClassName('Tsdy-router')[0];
        var routerNode = fatherNode.getElementsByClassName('router');
        for (let i = 0; i < routerNode.length; i++) {
            routerNode[i].addEventListener('click', function (e) {
                e.preventDefault();
                ajax(fatherNode, routerNode[i].pathname, "GET");
            })
        }
    }

    function pushState(url) {  //无中生有

        let state = {
            title: urlList.length,
            url: window.location.pathname
        }
        if (urlList.length == 1) {
            url = url.replace('/', "");//index为“／”所以第一个路由要把“／”去掉增加美观性，不然就会出现 ／／
        }
        window.history.pushState(state, urlList.length + 1, window.location.href + url);
        urlList.push({
            title: urlList.length + 1,
            url: url
        })
        //absoluteSit ++;
    }

    function spliceNodeList() {
        nodeList.splice(urlList.length - 1, nodeList.length);
    }

    //init
    var urlList = [];//存储了返回所需的url
    var nodeList = [];//内存中的元素。virtualDom
    var ajaxObject = null;    //当前正在进行的XMLHttpRequest实例
    var loading_judge = true;  //在出现loading时变为false防止用户此时乱按前进返回
    var state = {   
        title: 0,
        url: window.location.href
    }
    var judge = true; //防止连续按返回 或 前进。
    //init
    window.history.pushState({title:0,url:""},0,'/');
    urlList.push(state);//刚进入index页面时，将index的state存入urlList，注意此时的window.history.state=null;
    nodeList.push({   //将index中的Tsdy-router路由节点存入节点列表
        node: document.getElementsByClassName('Tsdy-router')[0],
        sit: nodeList.length,
        url: window.location.href
    })
    addlistener(document);

    window.addEventListener('popstate', function () {
        if (judge && loading_judge) {   //两个判断都得满足，才可以触发
            judge = false;     //点一次返回或前进后,再点击就不会再触发这个分支
            try {   //当返回相对index时，window.history.state可能为null，此时this.history.state.title会抛出TypeError
                if (this.history.state.title + 2 == urlList.length) {  //back
                    
                    urlList.pop();
                    let page = productbackPage(nodeList[urlList.length - 1].node);
                    let brother = this.document.getElementsByClassName('Tsdy-router')[0]
                    mounted(page, brother);
                    //-----safari
                    // brother.className = "Tsdy-router";
                    //----
                    this.setTimeout(() => {
                        delPage(brother);
                        judge = true;
                    }, 400);
                }
                else if (this.history.state.title == urlList.length) {  //go
                    urlList.push(this.history.state);
                    let page = productgoPage(nodeList[urlList.length - 1].node);//virtual 
                    let brother = this.document.getElementsByClassName('Tsdy-router')[0]
                    mounted(page, brother);
                    this.setTimeout(() => {
                        delPage(brother);
                        judge = true;
                    }, 400);
                    
                }
                this.setTimeout(() => {
                    judge = true;
                }, 400);   //400ms为最小点击返回或前进的间隔时间
            } catch (err) {
                judge = true;
                this.console.log(err);
            }
        } else if(!judge) {
            try {   //当返回相对index时，window.history.state可能为null，此时this.history.state.title会抛出TypeError
                if (this.history.state.title + 2 == urlList.length) {  //back
                    this.history.forward();
                }
                else if (this.history.state.title == urlList.length) {  //go
                    this.history.back();
                }
            } catch (err) {
                this.console.log(err);
            }
        }else if(!loading_judge){  //loading时，返回终止loading
            judge = false;
            abortAjax(ajaxObject);
            this.history.go(1);
            judge = true;
        }
    })


    window.addEventListener('hashchange',function(e) {
        this.console.log(e);
    })

}());
