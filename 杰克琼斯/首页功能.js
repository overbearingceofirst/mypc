// 列表渲染系列
$.ajax({
    url: "https://cdn.bestseller.com.cn/assets/pc/JACKJONES/nav.json",
    type: "get",
    // date:{},
    dataType: "json",
    success: function (res) {
        // res---返回数据
        var data = res.data;
        
        $("#showliat a").mouseover(function(){
            $("#navlist12s").show()

            $("#ullist12s").html("")
            var str ,kkk ,lis;
            var index = $("#showliat a").index(this);
            var list = data[index].list;
            if(list.length==0){
                $("#navlist12s").hide()
            }
            var imgo = '<li class="imgo">'
                + '<img src="' + data[index].picUrl + '" alt="" class="img3">'
                + '</li>'
            // 第一层
            $.each(list, function (index, ele) {
                var wangzhi2=ele.navigationUrl.indexOf("?")
                var wangzhi3=ele.navigationUrl.substring(wangzhi2+1)
                console.log(wangzhi3)
                str = "";
                kkk = "";
                lis = "";
                lis = '<li><a href="shangpmingzi.html'+"?"+wangzhi3+'" target="_blank">' + ele.navigationName + '</a>'
                // 第二层
                $.each(ele.list, function (index1, ele2) {
                    console.log(ele2.navigationName)
                    var wangzhi4=ele2.navigationUrl.indexOf("?")
                    var wangzhi5=ele2.navigationUrl.substring(wangzhi4+1)
                    kkk +=
                    '<a href="shangpmingzi.html'+"?"+wangzhi5+'" target="_blank">' + ele2.navigationName + '</a>'
                                    
                })
                lis += kkk+'</li>'
                $("#ullist12s").append(lis)


            })
            
            $("#ullist12s").append(imgo);

        })
        $("#showliat a").mouseleave(function(){
            $("#navlist12s").hide()
        })
        $("#navlist12s").mouseover(function(){
            $("#navlist12s").show()
        })
        $("#navlist12s").mouseleave(function(){
            $("#navlist12s").hide()
        })
    }  
})
// cookie
var cookieObj={
    set:function (o){
    //	document.cookie="hobby=篮球; expires="+date1.toGMTString();
            var cookiestr=encodeURIComponent(o.name)+"="+encodeURIComponent(o.value);
            if(o.expires){
                cookiestr+="; expires="+o.expires;
            }
        document.cookie=cookiestr;
    },
    get:function(name){
        var cook=document.cookie;
             var arr=cook.split("; ");
             for(var i=0;i<arr.length;i++){
                 var newarr=arr[i].split("=");
                 if(name==newarr[0]){
                     return decodeURIComponent(newarr[1])
                 }
             }
    },
    del:function(names){
        //设置时间为过期
            var nowdata=new Date();
            nowdata.setDate(-1);
            //调用设置方法
            cookieObj.set({
                name:names,
                expires:nowdata.toGMTString()
            })
    }

}



// 功能实现
var luobolist = document.getElementById("lunbo1").getElementsByTagName("li");
var a = document.getElementsByClassName("flex-control-nav")[0].getElementsByTagName("a")
// console.log(luobolist);
var x = 0;
var time = setInterval(move, 3000);
function move() {
    if (x == 1) {
        x = 0;
    } else {
        x++;
    }
    for (var i = 0; i < luobolist.length; i++) {
        luobolist[i].className = "";
        a[i].className = "";
    }
    // console.log(x)
    luobolist[x].className = "show1"
    a[x].className = "show";
}

// 无缝轮播
$("#move-k").width(1378)
var movek=document.getElementById("move-k");
var lis2=document.getElementById("bigimg").getElementsByTagName("li");
// console,log(lis2)
var num=0;
var num2=0;
var flag=true;
console.log($("#bigimg li").length-1)
    var pp=setInterval(next2,1000)
    var kl=setInterval(next,10)
    function next(){
        if(flag){
            flag=false;//运动中
            num++;//下标
            if(num>14){//大于长度-2
                animate(movek,{left:-100*num},800,function(){
                    //瞬间回到第1个块
                    num=0;
                    movek.style.left=0;//
                    flag=true;
                });
            }else{
                //否则正常运动
                animate(movek,{left:-100*num},800,function(){
                    flag=true;
                });
            }
        }
    }
    function next2(){
        if(num2>=3){
            num2=-1;
        }else{
            num2++;
            for(var y=0;y<lis2.length;y++){
                lis2[y].className="";
            }
            lis2[num2].className="ml-puk";
            
        }
    }

    // 点击小图切换短袖大图：
    // 大图
    var bgimg=document.getElementById("bgimg").getElementsByTagName("div")
    // 小图
    // 图标
    var next1=document.getElementById("next1");
    var prev1=document.getElementById("prev1");
    var z=null;
    var bgsmallimg=document.getElementById("bgsmallimg").getElementsByTagName("span")
    for(var t=0;t<bgsmallimg.length;t++){
        bgsmallimg[t].index=t;
        
        bgsmallimg[t].onclick=function(){
            for(var v=0;v<bgsmallimg.length;v++){
                    bgsmallimg[v].className="";
                    bgimg[v].style.display="none";

            }
            this.className="bgshow";
            bgimg[this.index].style.display="block";
            z=this.index;

        }
    }
        var g=0;
        next1.onclick=function(){
            g++;
            z=z+g;
            if(z>5){
                t==0;
            }else if(z<0){
                z=4;
            }
            for(var v=0;v<bgsmallimg.length;v++){
                bgsmallimg[v].className="";
                bgimg[v].style.display="none";

            }
            bgsmallimg[z].className="";
            bgimg[z].style.display="block";

        }
        prev1.onclick=function(){
            g--;
            z=z+g;
            if(z>5){
                t==0;
            }else if(z<0){
                z=4;
            }
            for(var v=0;v<bgsmallimg.length;v++){
                bgsmallimg[v].className="";
                bgimg[v].style.width="0px";

            }
            bgsmallimg[z].className="";
            bgimg[z].style.display="block";
        }
    

    

// 印花处点击切换功能
$("#firstkatong li").click(dian);
$('#zimu li').click(dian2)
function dian() {
    $(this).addClass("ks-active").siblings().removeClass();
    $("#katonglist div").hide().eq($("#firstkatong li").index(this)).fadeIn(1000)
}
function dian2() {
    $(this).addClass("ks-active").siblings().removeClass();
    $("#zimulist div").hide().eq($('#zimu li').index(this)).fadeIn(1000)
}


var login_passwords_match=document.getElementById("login_passwords_match")
// 获取当前的用户名
var strr=cookieObj.get("userarr");
var arrr=JSON.parse(strr);
console.log(arrr)
if(arrr==null){
    login_passwords_match.innerText="登陆/注册";
}else{
    login_passwords_match.innerText="您好,"+arrr[0].phone+"用户"
}

// 检查购物车件数：
var arr=[];
var cartCompleted=document.getElementById("cartCompleted")
for(i=0;i<localStorage.length;i++){
   var hh=localStorage.getItem(localStorage.key(i));
   hh=JSON.parse(hh);
   arr.push(hh)  
}
if(arr==[]){
    cartCompleted.innerText="0"
}else{
    cartCompleted.innerText=arr.length;
}



