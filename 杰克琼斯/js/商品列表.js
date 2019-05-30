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

// 获取商品竖向数据内容
    var catalogue=document.getElementById("catalogue_descape")
    var myhash=location.search.substring(1);
    // console.log(myhash)
    var xhr=null;
    try{
    xhr=new XMLHttpRequest();//谷歌
    }catch{
    xhr=new ActiveXObject("Microsoft.XMLHTTP");//IE低版本
    }
    xhr.open("GET","https://cdn.bestseller.com.cn/classify/h5/JACKJONES/h5_list.json",true);
    xhr.send(myhash);
    xhr.onreadystatechange=function(){
        
        if(xhr.readyState==4&&xhr.status==200){
            var zhi=JSON.parse(xhr.responseText);
            console.log(zhi)
            var dataNS=zhi.data;
            console.log(dataNS)
            // 获取商品竖向数据内容
            var str="";
            // 商品详细题目
            var docstring="";
            for(var i=0;i<dataNS.length;i++){
                var loadstring="";
                //  str=dataNS[i].classifyName;
                str+='<li data-v-205c3502 class="firstLevel fontB font14 License">'
                        +'<div data-v-205c3502>'
                            +'<span>'+dataNS[i].classifyName+'</span>'
                        +'</div>'
                        +'<ul data-v-205c3502 class="secondContent vlink" neme="slide-trans" ">'
                            +'<li data-v-205c3502 class="secondLevel">'
                                +'<div data-v-205c3502>'
                                    +'<a data-v-205c3502 href="shangpmingzi.html?classifyIds='+dataNS[i].classifyId+'" target="_blank">'+dataNS[i].classifyName+'</a>'
                                +'</div>'
                                +'<ul data-v-205c3502></ul>'
                            +'</li>'

                for(var a=0;a<dataNS[i].list.length;a++){
                    
                    // loadstring+=dataNS[i].list[a].classifyName;
                    loadstring+=
                        '<li data-v-205c3502 class="secondLevel">'
                                    +'<div data-v-205c3502>'
                                    +'<a data-v-205c3502 href="shangpmingzi.html?classifyIds='+dataNS[i].list[a].classifyId+'" target="_blank">'+dataNS[i].list[a].classifyName+'</a>'
                                    +'</div>'
                                    +'<ul data-v-205c3502></ul>'
                                +'</li>'
                                
                }
                str+=loadstring+'</ul>'+'</li>'
                catalogue.innerHTML=str;
                
            }
            // 点击li切换样式
            var License=document.getElementsByClassName("License");
            var vlink=document.getElementsByClassName("vlink");
            for(var k=0;k<License.length;k++){
                vlink[k].style.cssText="display:none"  
            }
            console.log(License)
            var flag=true;
            for(var k=0;k<License.length;k++){
                License[k].index=k;
                License[k].onclick=function(){

                        for(var k=0;k<License.length;k++){
                            if(this==License[k]){
                                if(vlink[k].style.display=="none"){
                                    vlink[k].style.display="block";
                                }else{
                                    vlink[k].style.display="none"
                                }
                                
                            }      
                        }  
                }
            }

        }
    }



//   获取当前商品数据
var Number=document.getElementById("Number")
var goodsListBox=document.getElementById("goodsListBox")
$.ajax({
    url: "json/offering.json",
    type: "GET",
    dataType: "json",
    async:true,
    success: function (re) {
        // res---返回数据
        var data = re.data;
        console.log(data)
        // 共多少个商品
        Number.innerHTML=re.totalCounts;
        // 第一层商品循环
        var str="";
        $.each(data, function (data, ele) {
            str+= '<li class="fl_l ovf hoverState" style="overflow: hidden;" nama2="'+ele.sellCount+'">'
            +'<div class="goods-img classi1">'
                +'<a href="商品详细.html?design='+ele.gsColorCode+'" target="_blank">'
                   +'<img src="https://cdn.bestseller.com.cn'+ele.gscMaincolPath+'" target="_blank" alt="" name="https://cdn.bestseller.com.cn'+ele.gscMaincolPath.substring(0,ele.gscMaincolPath.indexOf("_")+1)+'p1.jpg" class="transImg psrnumber">'
                +'</a>'
                +'<span class="bg-color-black color-white" style="    top: 440px;">快速购买</span>'
            +'</div>'
            +'<a href="商品详细.html?design='+ele.gsColorCode+'" class="block mart20 goods-tip" style="position: relative;" target="_blank">'
               +' <span class="width8">'+ele.goodsName+'</span>'
               +' <span>'
                   +' <span class="discountNum" style="right: 15px;">5.0折</span>'
               + '</span>'
           +' </a>'
           +' <p class="mart5 martop5">'
               +' <span class="discountPrice">'
                    
                   +ele.discountPrice

               +' </span>'
               +' <span class="originPrice">'
                  + ele.originalPrice
                 +' </span>'
                  +'<span class="discountImg"><img src="../img/90.png" alt=""></span>'
            +'</p>'
        +'</li>'
        })
        // 所有li绑定鼠标在上事件
        goodsListBox.innerHTML=str;
        var psrnumber=$(".psrnumber")
        var src=null;
        var name=null;
        $(".psrnumber").mouseover(function(){
            src=this.src;
            name=this.name;
            this.src=this.name;
            this.name=this.src;
        })
        $(".psrnumber").mouseleave(function(){
                this.src=src;
                this.name=name;
        })


        //点击排序
        var control=document.getElementById("control").getElementsByTagName("span");
        var hoverState=document.getElementsByClassName("hoverState");
        var arr=[];
        control[0].onclick=function(){
            for(var y=0;y<data.length-1;y++){
                for(var t=0;t<data.length-y-1;t++){
                    if(data[t].sellStock>=data[t+1].sellStock){
                        // console.log(data[data2].sellCount)
                        var temp;
                        temp=data[t];
                        data[t]=data[t+1];
                        data[t+1]=temp;
                    }
                }
            }
            console.log(data)
            var str2="";
            $.each(data, function (data, ele) {
                str2+= '<li class="fl_l ovf hoverState" style="overflow: hidden;" nama2="'+ele.sellCount+'">'
                +'<div class="goods-img classi1">'
                    +'<a href="商品详细.html?design='+ele.gsColorCode+'" target="_blank">'
                    +'<img src="https://cdn.bestseller.com.cn'+ele.gscMaincolPath+'" target="_blank" alt="" name="https://cdn.bestseller.com.cn'+ele.gscMaincolPath.substring(0,ele.gscMaincolPath.indexOf("_")+1)+'p1.jpg" class="transImg psrnumber">'
                    +'</a>'
                    +'<span class="bg-color-black color-white" style="    top: 440px;">快速购买</span>'
                +'</div>'
                +'<a href="商品详细.html?design='+ele.gsColorCode+'" class="block mart20 goods-tip" style="position: relative;" target="_blank">'
                +' <span class="width8">'+ele.goodsName+'</span>'
                +' <span>'
                    +' <span class="discountNum" style="right: 15px;">5.0折</span>'
                + '</span>'
            +' </a>'
            +' <p class="mart5 martop5">'
                +' <span class="discountPrice">'
                        
                    +ele.discountPrice

                +' </span>'
                +' <span class="originPrice">'
                    + ele.originalPrice
                    +' </span>'
                    +'<span class="discountImg"></span>'
                +'</p>'
            +'</li>'
            })
            goodsListBox.innerHTML=str2;
            var psrnumber=$(".psrnumber")
            var src=null;
            var name=null;
            $(".psrnumber").mouseover(function(){
                src=this.src;
                name=this.name;
                this.src=this.name;
                this.name=this.src;
            })
            $(".psrnumber").mouseleave(function(){
                    this.src=src;
                    this.name=name;
            })
        }
        // 点击销量
        control[1].onclick=function(){
            for(var y=0;y<data.length-1;y++){
                for(var t=0;t<data.length-y-1;t++){
                    if(data[t].sellCount>=data[t+1].sellCount){
                        // console.log(data[data2].sellCount)
                        var temp;
                        temp=data[t];
                        data[t]=data[t+1];
                        data[t+1]=temp;
                    }
                }
            }
            console.log(data)
            var str2="";
            $.each(data, function (data, ele) {
                str2+= '<li class="fl_l ovf hoverState" style="overflow: hidden;" nama2="'+ele.sellCount+'">'
                +'<div class="goods-img classi1">'
                    +'<a href="商品详细.html?design='+ele.gsColorCode+'" target="_blank">'
                    +'<img src="https://cdn.bestseller.com.cn'+ele.gscMaincolPath+'" target="_blank" alt="" name="https://cdn.bestseller.com.cn'+ele.gscMaincolPath.substring(0,ele.gscMaincolPath.indexOf("_")+1)+'p1.jpg" class="transImg psrnumber">'
                    +'</a>'
                    +'<span class="bg-color-black color-white" style="    top: 440px;">快速购买</span>'
                +'</div>'
                +'<a href="商品详细.html?design='+ele.gsColorCode+'" class="block mart20 goods-tip" style="position: relative;" target="_blank">'
                +' <span class="width8">'+ele.goodsName+'</span>'
                +' <span>'
                    +' <span class="discountNum" style="right: 15px;">5.0折</span>'
                + '</span>'
            +' </a>'
            +' <p class="mart5 martop5">'
                +' <span class="discountPrice">'
                        
                    +ele.discountPrice

                +' </span>'
                +' <span class="originPrice">'
                    + ele.originalPrice
                    +' </span>'
                    +'<span class="discountImg"></span>'
                +'</p>'
            +'</li>'
            })
            goodsListBox.innerHTML=str2;
            var psrnumber=$(".psrnumber")
            var src=null;
            var name=null;
            $(".psrnumber").mouseover(function(){
                src=this.src;
                name=this.name;
                this.src=this.name;
                this.name=this.src;
            })
            $(".psrnumber").mouseleave(function(){
                    this.src=src;
                    this.name=name;
            })
            }
        
            // 新品
            control[2].onclick=function(){
                goodsListBox.innerHTML="无新品"
                goodsListBox.className="goodsListBoxl goods-list-wrapper ovf"
            }
            // 价格
            x=0;
            control[3].onclick=function(){
                // 从大到小
                if(x==1){
                    x=0;
                    for(var y=0;y<data.length-1;y++){
                        for(var t=0;t<data.length-y-1;t++){
                            if(data[t].discountPrice>=data[t+1].discountPrice){
                                // console.log(data[data2].sellCount)
                                var temp;
                                temp=data[t];
                                data[t]=data[t+1];
                                data[t+1]=temp;
                            }
                        }
                    }
                    console.log(data)
                    // 从小到大
                }else if(x==0){
                    x++;
                    for(var y=0;y<data.length-1;y++){
                        for(var t=0;t<data.length-y-1;t++){
                            if(data[t].discountPrice<=data[t+1].discountPrice){
                                // console.log(data[data2].sellCount)
                                var temp;
                                temp=data[t];
                                data[t]=data[t+1];
                                data[t+1]=temp;
                            }
                        }
                    }
                }
                var str2="";
                $.each(data, function (data, ele) {
                    str2+= '<li class="fl_l ovf hoverState" style="overflow: hidden;" nama2="'+ele.sellCount+'">'
                    +'<div class="goods-img classi1">'
                        +'<a href="商品详细.html?design='+ele.gsColorCode+'" target="_blank">'
                        +'<img src="https://cdn.bestseller.com.cn'+ele.gscMaincolPath+'" target="_blank" alt="" name="https://cdn.bestseller.com.cn'+ele.gscMaincolPath.substring(0,ele.gscMaincolPath.indexOf("_")+1)+'p1.jpg" class="transImg psrnumber">'
                        +'</a>'
                        +'<span class="bg-color-black color-white" style="    top: 440px;">快速购买</span>'
                    +'</div>'
                    +'<a href="商品详细.html?design='+ele.gsColorCode+'" class="block mart20 goods-tip" style="position: relative;" target="_blank">'
                    +' <span class="width8">'+ele.goodsName+'</span>'
                    +' <span>'
                        +' <span class="discountNum" style="right: 15px;">5.0折</span>'
                    + '</span>'
                +' </a>'
                +' <p class="mart5 martop5">'
                    +' <span class="discountPrice">'
                            
                        +ele.discountPrice
    
                    +' </span>'
                    +' <span class="originPrice">'
                        + ele.originalPrice
                        +' </span>'
                        +'<span class="discountImg"></span>'
                    +'</p>'
                +'</li>'
                })
                goodsListBox.innerHTML=str2;
                // goodsListBox.style.cssText="none"
                goodsListBox.className="goods-list-wrapper ovf"
                var psrnumber=$(".psrnumber")
                var src=null;
                var name=null;
                $(".psrnumber").mouseover(function(){
                    src=this.src;
                    name=this.name;
                    this.src=this.name;
                    this.name=this.src;
                })
                $(".psrnumber").mouseleave(function(){
                        this.src=src;
                        this.name=name;
                })

            }

            // 价格筛选
            var btn=document.getElementById("btn")

            btn.onclick=function(){
                var lowest=document.getElementById("lowest").value;
                var highest=document.getElementById("highest").value;
                var arr=[]
                console.log(data[1].discountPrice)
                for(var y=0;y<data.length;y++){
                   if(data[y].discountPrice > parseFloat(lowest) && data[y].discountPrice<parseFloat(highest) ){
                       arr.push(data[y])
                   }
                }
                console.log(arr)
                var str2="";
                $.each(arr, function (data, ele) {
                    str2+= '<li class="fl_l ovf hoverState" style="overflow: hidden;" nama2="'+ele.sellCount+'">'
                    +'<div class="goods-img classi1">'
                        +'<a href="商品详细.html?design='+ele.gsColorCode+'" target="_blank">'
                        +'<img src="https://cdn.bestseller.com.cn'+ele.gscMaincolPath+'" target="_blank" alt="" name="https://cdn.bestseller.com.cn'+ele.gscMaincolPath.substring(0,ele.gscMaincolPath.indexOf("_")+1)+'p1.jpg" class="transImg psrnumber">'
                        +'</a>'
                        +'<span class="bg-color-black color-white" style="    top: 440px;">快速购买</span>'
                    +'</div>'
                    +'<a href="商品详细.html?design='+ele.gsColorCode+'" class="block mart20 goods-tip" style="position: relative;" target="_blank">'
                    +' <span class="width8">'+ele.goodsName+'</span>'
                    +' <span>'
                        +' <span class="discountNum" style="right: 15px;">5.0折</span>'
                    + '</span>'
                +' </a>'
                +' <p class="mart5 martop5">'
                    +' <span class="discountPrice">'
                            
                        +ele.discountPrice
    
                    +' </span>'
                    +' <span class="originPrice">'
                        + ele.originalPrice
                        +' </span>'
                        +'<span class="discountImg"></span>'
                    +'</p>'
                +'</li>'
                })
                goodsListBox.innerHTML=str2;
                // goodsListBox.style.cssText="none"
                goodsListBox.className="goods-list-wrapper ovf"
                var psrnumber=$(".psrnumber")
                var src=null;
                var name=null;
                $(".psrnumber").mouseover(function(){
                    src=this.src;
                    name=this.name;
                    this.src=this.name;
                    this.name=this.src;
                })
                $(".psrnumber").mouseleave(function(){
                        this.src=src;
                        this.name=name;
                })
            }


    }
})
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


