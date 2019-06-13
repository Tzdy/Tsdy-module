## switch
在使用前先引入js，css依赖包

    <script src="https://tzdy.github.io/Tsdy-module/switch/js/Tsdy-switch.js"></script>

    <link rel="stylesheet" href="https://tzdy.github.io/Tsdy-module/switch/css/Tsdy-switch.css">
注意！js一定要在组件后面引入
***
### 定义一个组件
1,你可以把以下语句写到该组件依赖的css，js区间中的任意位置 

    <div class="Tsdy-switch"></div>

2,接下来可以通过内联脚本，或引入外部脚本的形式进行switch的方法，位置的设置。
    
    <script>
        var switch = new Tsdy-Switch([
            {
                methods:[  //每次点击开关都会执行methods中的函数,可以为多个函数。
                    function(judge){ //每次点击开关judge会改变 true or false 
                    }
                ],
                style:"position:absolute;"//这里通过字符串的形式可以设置开关的定位方式，以及具体位置。当然你也可以直接在css中设置
            }
        ])
    </script>
### 定义多个组件
由于对每个switch是选取的一个数组，所以在为每个组件设置定位与方法时，要按照顺序设置。

    <script>
        var switch = new Tsdy-Switch([
            {// 第一个
                methods:[
                    function(judge){}
                ],
                style:"position:absolute;"
            },
            {// 第二个
                methods:[
                    function(judge){}
                ],
                style:""
            }
        ])
    </script>

这相当于两个开关
