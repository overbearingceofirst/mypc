// 列表渲染系列
$.ajax({
    url: "https://cdn.bestseller.com.cn/assets/pc/JACKJONES/nav.json",
    type: "get",
    // date:{},
    dataType: "json",
    success: function (res) {
        // res---返回数据
        var data = res.data;
        // console.log(res)
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
                
                str = "";
                kkk = "";
                lis = "";
                lis = '<li><a href="" class="fw">' + ele.navigationName + '</a>'
                // 第二层
                $.each(ele.list, function (index1, ele2) {
                    // console.log(ele2.navigationName)
                    kkk +=
                    '<a>' + ele2.navigationName + '</a>'
                                    
                })
                lis += kkk+'</li>'
                $("#ullist12s").append(lis)


            })
            
            $("#ullist12s").append(imgo);

        })
        
        $("#showliat").mouseleave(function(){
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



// 判断函数
var obj={};
function Check(ele,reg,tips){
    var eles=document.getElementById(ele);
    
        eles.onblur=function(){
            if(this.value){
                if(reg.test(this.value)){
                    this.nextElementSibling.style.display="block";
                    this.nextElementSibling.innerHTML="";
                    obj[ele]=true;
                }else{
                    this.nextElementSibling.style.display="block";
                    this.nextElementSibling.innerHTML=tips+"格式错误";
                    obj[ele]=false;
                }
            }else{
//				nextElementSibling--下一个兄弟元素
                this.nextElementSibling.style.display="block";
                this.nextElementSibling.innerHTML="请输入"+tips;		
                obj[ele]=false;
            }
            
        }
            
    }

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



var PromptEvent=document.getElementById("PromptEvent")
    function Check2(ele,reg,tips){
        var eles=document.getElementById(ele);
        
            eles.onblur=function(){
                if(this.value){
                    if(this.value==reg){
                        PromptEvent.style.display="block";
                        PromptEvent.innerHTML="";
                        obj[ele]=true;
                        console.log(this.value)
                    }else{
                        PromptEvent.style.display="block";
                        PromptEvent.innerHTML=tips+"格式错误";
                        obj[ele]=false;
                    }
                }else{
    //				nextElementSibling--下一个兄弟元素
                    PromptEvent.style.display="block";
                    PromptEvent.innerHTML="请输入"+tips;		
                    obj[ele]=false;
                }
                
            }
            console.log(reg)
                
        }
    // 手机
    Check("mobile",/^1[3|5|7|8|9|4|6]\d{9}$/,"手机号");
    // 随机数；
    var count=["+","-","*","/"]
    // 随机颜色；
    var num=Math.floor(Math.random()*9);
    var num2=Math.floor(Math.random()*9);
    // 随机运算符
    var counting=Math.floor(Math.random()*4)
    // 随机颜色：
    var arr=[];
    var color=document.getElementById("color")
    for(var i=0;i<5;i++){
        var color2=Math.ceil(Math.random()*0xFFFFFF).toString(16);
        arr.push(color2)
    }
    // 赋值给数字颜色；
   var colorspan=color.children;
    for(var i=0;i<5;i++){
        colorspan[i].style.color="#"+arr[i];
    }
    colorspan[0].innerHTML=num;
    colorspan[1].innerHTML=count[counting];
    colorspan[2].innerHTML=num2;

    console.log(color2)
    var daan=0;
    console.log(daan)
    if(count[counting]=="+"){
        daan=num+num2;
    }else if(count[counting]=="-"){
        daan=num-num2;
    }else if(count[counting]=="*"){
        daan=num*num2;
    }else if(count[counting]=="/"){
        daan=num/num2;
    }
    console.log(num+count[counting]+num2)
    console.log(daan)
    
    var daab2=0;
    color.onclick=function(){
        daab2=0;
        // 随机数；
        var count=["+","-","*","/"]
        // 随机颜色；
        var num=Math.floor(Math.random()*9);
        var num2=Math.floor(Math.random()*9);
        // 随机运算符
        var counting=Math.floor(Math.random()*4)
        // 随机颜色：
        var arr=[];
        for(var i=0;i<5;i++){
            var color2=Math.ceil(Math.random()*0xFFFFFF).toString(16);
            arr.push(color2)
        }
        // 赋值给数字颜色；
        var colorspan=color.children;
        for(var i=0;i<5;i++){
            colorspan[i].style.color="#"+arr[i];
        }
        colorspan[0].innerHTML=num;
        colorspan[1].innerHTML=count[counting];
        colorspan[2].innerHTML=num2;
      
        console.log(count[counting])
        if(count[counting]=="+"){
            daab2=num+num2;
        }else if(count[counting]=="-"){
            daab2=num-num2;
        }else if(count[counting]=="*"){
            daab2=num*num2;
        }else if(count[counting]=="/"){
            daab2=num/num2;
        }    
        console.log(daab2) 
        Check2("code",daab2,"验证码")
    }
    console.log(daab2)
        //验证验证码：
        Check2("code",daan,"验证码")
      

    //短信验证
    var btn=document.getElementsByClassName("get-msg-btn")[0];
    btn.onclick=function(){
        var WrapSmsClass=[];
        var smsified="";
        for(var l=0;l<6;l++){
            var WrapSms=Math.floor(Math.random()*9);
            WrapSmsClass.push(WrapSms)
        }
        for(var q=0;q<WrapSmsClass.length;q++){
            smsified+=WrapSmsClass[q];
        }
        alert(smsified)
        console.log(smsified)
        Check2("smsID",smsified,"短信")
    }
    console.log(obj)
    // 储存用户信息：
    var phone=document.getElementById("phone");
    var login=document.getElementsByClassName("login-btn")[0];
    login.onclick=function(){
        var mobile=document.getElementById("mobile").value;
        if(PromptEvent.innerText==""&&phone.innerText==""){
            // 手机号码
            if(mobile){
                if(obj.mobile){
                    var nowdate=new Date();//获取当前时间
                    nowdate.setHours(24);
                    var cookiearr=cookieObj.get("userarr");
                    // 第一次设置
                    if(cookiearr==undefined){
                        cookieObj.set({
                            name:"userarr",
                            value:"[]",
                            expires:nowdate.toGMTString()
                        })
                        var arr=JSON.parse(cookieObj.get("userarr"));
                            console.log(arr)
                            var userobj={
                                username:"userarr",
                                pass:'123',
                                phone:mobile
                            };
                            console.log(cookieObj.get("userarr"))
                            // console.log(arr)
                            arr.push(userobj)

                            cookieObj.set({
                                name:"userarr" ,
                                value:JSON.stringify(arr),
                                expires:nowdate.toGMTString()
                                
                            })
                            alert("注册成功，跳转登录页面...");
					        location.href="首页.html";

                    }else{
                        alert("跳转登录页面...");
					    location.href="首页.html";
                    }
                    

                }
            }else{
                alert("请按规则填写");
            }
            
        }else{
            alert("请填写必填项");
        }

    }





    