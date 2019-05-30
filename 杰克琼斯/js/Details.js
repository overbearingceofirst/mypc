



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
        var dataNS=zhi.data;
        // 获取商品竖向数据内容
        var str="";
        // 商品详细题目
        var docstring="";
        for(var i=0;i<dataNS.length;i++){
            loadstring=""
            //  str=dataNS[i].classifyName;
            str+='<li data-v-205c3502 class="firstLevel fontB font14 License">'
                    +'<div data-v-205c3502>'
                        +'<span>'+dataNS[i].classifyName+'</span>'
                    +'</div>'
                    +'<ul data-v-205c3502 class="secondContent vlink" neme="slide-trans" ">'
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



// 商品详细信息
// 获取商品id值
var myhash=location.search.substring(location.search.indexOf("=")+1,location.search.length-3);
var listhash=myhash.indexOf("=");
$.ajax({
    url: "https://cdn.bestseller.com.cn/detail/JACKJONES/"+myhash+".json",
    type: "get",
    // date:{},
    dataType: "json",
    success: function (rs) {
        // res---返回数据
        // 大标题渲染
        $(".detailTitle").html("首页 / 所有商品/上装外套/"+rs.data.goodsName)
        var all=rs.data.color;
        console.log(all)
        // 渲染第一个目标：
        var swidata=rs.data.color[0].picurls;
        // 小图更换：
        var swidata=rs.data.color[0].picurls;
        var img="";
        $.each(swidata,function(date,ele){
            img+='<li class="leftImg">'
            +'<img src="https://cdn.bestseller.com.cn'+ele+'" alt="">'
        +'</li>'
        })
        $("#insets").html(img)
        // 第一个小图有边框 大图处也是默认的
        var insetsimg=document.getElementById("insets").getElementsByTagName("li")
        var originalimg=document.getElementById("img-original").getElementsByTagName("img")
        insetsimg[0].children[0].className="listImg";
        originalimg[0].src=insetsimg[0].children[0].src;

        //点解切换大图
        for(var i=0;i<insetsimg.length;i++){
            insetsimg[i].onclick=function(){
                for(var i=0;i<insetsimg.length;i++){
                    if(this==insetsimg[i]){
                        insetsimg[i].children[0].className="listImg";
                        originalimg[0].src=insetsimg[i].children[0].src;
                    }else{
                        insetsimg[i].children[0].className="";
                    }
                }
            }
        } 

        // 放大镜

        // 小快
        var detailTop=document.getElementsByClassName("detailTop")[0]
        var magnifier=document.getElementById("magnifier")
        // 图片
        var original=document.getElementById("img-original")
        // 放大镜图片
        var bigger=document.getElementById("bigger");
        var biggerImg=document.getElementById("biggerImg")

        original.onmouseover=function(){
			// 图像一致
            biggerImg.src= originalimg[0].src
            bigger.style.display="block";
            magnifier.style.display="block";
			
		}

        original.onmousemove=function(e){
            var e=e||window.event;
            //               128          +    外上面    +宽度/2
            var x=e.clientX-original.offsetLeft-detailTop.offsetLeft-magnifier.offsetWidth/2;
            //                 0
            var y=e.clientY-original.offsetTop-detailTop.offsetTop-magnifier.offsetHeight/2;
            //最小限制
			x<0 ? x=0 : x;
            y<0 ? y=0 : y;
            
            x> original.offsetWidth-magnifier.offsetWidth ? x=original.offsetWidth-magnifier.offsetWidth : x ;
            y> original.offsetHeight-magnifier.offsetHeight ? y= original.offsetHeight-magnifier.offsetHeight : y;
            //遮罩运动
			magnifier.style.left=x+"px";
            magnifier.style.top=y+"px";

            var bilix=biggerImg.offsetWidth/original.offsetWidth;
            var biliy=biggerImg.offsetHeight/original.offsetHeight;
            
            //改变大div的scrollLeft和scrollTop
			bigger.scrollLeft=x*bilix;
			bigger.scrollTop=y*biliy;
        }

        //鼠标经过小移除小div
		original.onmouseout=function(){
			bigger.style.display="none";
            magnifier.style.display="none";
        }
        
        // 继续渲染  =  =放大镜差点翻车
        // 标题：
        $("#subtitle").html(rs.data.goodsName)
        $("#product").html(rs.data.color[0].colorCode);
        $("#discountPrice").html(all[0].price)
        $(".sellPrice").html(all[0].originalPrice)
        // 尺寸循环sizes
        var getSize=document.getElementById("getSize")
        var DataFloat="";
        var SubArray=[];
        for(var y=0;y<all[0].sizes.length;y++){
            SubArray.push(all[0].sizes[y].sellStock);
            if(all[0].sizes[y].sellStock>0){
                DataFloat+='<li class="singleSize">'
                +all[0].sizes[y].sizeAlias;
                +'</li>'
            }else{
                DataFloat+='<li class="singleSize activeStock">'
                +all[0].sizes[y].sizeAlias;
                +'</li>'
            }
                       
        }
        getSize.innerHTML=DataFloat;
        var sizeof=document.getElementById("sizeof")
        // 点击尺码
        sizeof.innerHTML=SubArray[0];
        var understanding=getSize.children;

        // 点击
        for(var p=0;p<understanding.length;p++){
            understanding[p].onclick=function(){
                for(var p=0;p<understanding.length;p++){
                    if(understanding[p].className=="singleSize activeStock"){
                        understanding[p].className="singleSize activeStock";
                    }else{
                        if(this==understanding[p]){
                            understanding[p].className="singleSize sizeActive";
                            sizeof.innerHTML=SubArray[p];
                        }else{
                            understanding[p].className="singleSize";
                        }
                    }

                }
            }
        }

        // 颜色循环
        var ziarry=[];
        var imageArray=[];
        var imgArray=document.getElementById("imgArray")
        var ajax_get_images="";
        for(j=0;j<all.length;j++){
            console.log(all[j].colorAlias)
            imageArray.push(all[j].picurls[2]);
            ziarry.push(all[j].colorAlias)
        }
        console.log(ziarry)
        for(var q=0;q<imageArray.length;q++){
            console.log(q)
            ajax_get_images+='<li class="singleColor" name="'+ziarry[q]+'">'
                                +'<img src="https://cdn.bestseller.com.cn'+imageArray[q]+'" alt="" style="width: 52px;">'
                                +'<span class="chooseIcon"></span>'
                            +'</li>'
        }
        imgArray.innerHTML=ajax_get_images;
        var chooseIcon=document.getElementsByClassName("chooseIcon")
        var imgArrayon=imgArray.getElementsByTagName("li");
        imgArrayon[0].className="singleColor activeColor"
        for(var f=0;f<chooseIcon.length;f++){
            chooseIcon[f].style.display="none";
        }
        chooseIcon[0].style.display="block";
        // 点击切换！
        for(var o=0;o<imgArrayon.length;o++){
            imgArrayon[o].onclick=function(){
                for(var o=0;o<imgArrayon.length;o++){
                    if(this==imgArrayon[o]){
                        imgArrayon[o].className="singleColor activeColor";
                        chooseIcon[o].style.display="block";
                        move(o);
                    }else{
                        imgArrayon[o].className="singleColor";
                        chooseIcon[o].style.display="none";
                    }
                }
            } 
        }



        function move(num){
            console.log(num)
            var swidata=rs.data.color[num].picurls;
            // 小图更换：
            var swidata=rs.data.color[num].picurls;
            var img="";
            $.each(swidata,function(date,ele){
                img+='<li class="leftImg">'
                +'<img src="https://cdn.bestseller.com.cn'+ele+'" alt="">'
            +'</li>'
            })
            $("#insets").html(img)
            // 第一个小图有边框 大图处也是默认的
            var insetsimg=document.getElementById("insets").getElementsByTagName("li")
            var originalimg=document.getElementById("img-original").getElementsByTagName("img")
            insetsimg[0].children[0].className="listImg";
            originalimg[0].src=insetsimg[0].children[0].src;
        
            //点解切换大图
            for(var i=0;i<insetsimg.length;i++){
                insetsimg[i].onclick=function(){
                    for(var i=0;i<insetsimg.length;i++){
                        if(this==insetsimg[i]){
                            insetsimg[i].children[0].className="listImg";
                            originalimg[0].src=insetsimg[i].children[0].src;
                        }else{
                            insetsimg[i].children[0].className="";
                        }
                    }
                }
            } 
        
            // 放大镜
        
            // 小快
            var detailTop=document.getElementsByClassName("detailTop")[0]
            var magnifier=document.getElementById("magnifier")
            // 图片
            var original=document.getElementById("img-original")
            // 放大镜图片
            var bigger=document.getElementById("bigger");
            var biggerImg=document.getElementById("biggerImg")
        
            original.onmouseover=function(){
                // 图像一致
                biggerImg.src= originalimg[0].src
                bigger.style.display="block";
                magnifier.style.display="block";
                
            }
        
            original.onmousemove=function(e){
                var e=e||window.event;
                //               128          +    外上面    +宽度/2
                var x=e.clientX-original.offsetLeft-detailTop.offsetLeft-magnifier.offsetWidth/2;
                //                 0
                var y=e.clientY-original.offsetTop-detailTop.offsetTop-magnifier.offsetHeight/2;
                //最小限制
                x<0 ? x=0 : x;
                y<0 ? y=0 : y;
                
                x> original.offsetWidth-magnifier.offsetWidth ? x=original.offsetWidth-magnifier.offsetWidth : x ;
                y> original.offsetHeight-magnifier.offsetHeight ? y= original.offsetHeight-magnifier.offsetHeight : y;
                //遮罩运动
                magnifier.style.left=x+"px";
                magnifier.style.top=y+"px";
        
                var bilix=biggerImg.offsetWidth/original.offsetWidth;
                var biliy=biggerImg.offsetHeight/original.offsetHeight;
                
                //改变大div的scrollLeft和scrollTop
                bigger.scrollLeft=x*bilix;
                bigger.scrollTop=y*biliy;
            }
        
            //鼠标经过小移除小div
            original.onmouseout=function(){
                bigger.style.display="none";
                magnifier.style.display="none";
            }
            
            // 继续渲染  =  =放大镜差点翻车
            // 标题：
            $("#subtitle").html(rs.data.goodsName)
            $("#product").html(rs.data.color[num].colorCode);
            $("#discountPrice").html(all[num].price)
            $(".sellPrice").html(all[num].originalPrice)
            // 尺寸循环sizes
            var DataFloat="";
            var SubArray=[];
            console.log(all[num].sizes)
            for(var y=0;y<all[num].sizes.length;y++){
                SubArray.push(all[num].sizes[y].sellStock);
                if(all[num].sizes[y].sellStock>0){
                    DataFloat+='<li class="singleSize">'
                    +all[num].sizes[y].sizeAlias;
                    +'</li>'
                }else{
                    DataFloat+='<li class="singleSize activeStock">'
                    +all[num].sizes[y].sizeAlias;
                    +'</li>'
                }
                        
            }
            getSize.innerHTML=DataFloat;
            var sizeof=document.getElementById("sizeof")
            // 点击尺码
            sizeof.innerHTML=SubArray[0];
            var understanding=getSize.children;
            console.log(understanding)
        
            // 点击
            for(var p=0;p<understanding.length;p++){
                understanding[p].onclick=function(){
                    for(var p=0;p<understanding.length;p++){
                        if(understanding[p].className=="singleSize activeStock"){
                            understanding[p].className="singleSize activeStock";
                        }else{
                            if(this==understanding[p]){
                                understanding[p].className="singleSize sizeActive";
                                sizeof.innerHTML=SubArray[p];
                            }else{
                                understanding[p].className="singleSize";
                            }
                        }
        
                    }
                }
            }
        }
        // 点击增加商品
        var of_get_regulation_constraints=document.getElementById("of_get_regulation_constraints");
        // console.log(sizeof.innerText)
        var kk=Number(of_get_regulation_constraints.innerText)
        var increase=document.getElementById("increase");
        increase.onclick=function(){
            kk++;
            if( kk<1||kk>Number(sizeof.innerText)){
                of_get_regulation_constraints.innerHTML=1
            }else{
                of_get_regulation_constraints.innerHTML=kk;
            }
            if(kk>Number(sizeof.innerText)){
                of_get_regulation_constraints.innerHTML=Number(sizeof.innerText)
            }else{
                of_get_regulation_constraints.innerHTML=kk;
            }
            // console.log(of_get_regulation_constraints)
        }


        // 点击减少商品
        console.log(kk)
        var reduce=document.getElementById("reduce");
        reduce.onclick=function(){
            kk--;
            if( kk<1||kk>Number(sizeof.innerText)){
                of_get_regulation_constraints.innerHTML=1
            }else{
                of_get_regulation_constraints.innerHTML=kk;
            }
            if(kk>Number(sizeof.innerText)){
                of_get_regulation_constraints.innerHTML=Number(sizeof.innerText)
            }else{
                of_get_regulation_constraints.innerHTML=kk;
            }
        }



        // 购物车
        var ColorInit2=[];
        var sizeActive2=[];
        var addCart=document.getElementsByClassName("addCart")[0];
        // 第一个图片数据
        var insets=document.getElementById("insets")
        var luaA_checkudata=insets.getElementsByTagName("img");
        // 描述
        var subtitle=document.getElementById("subtitle")
        // 颜色
        // var activeColor=document.getElementsByClassName("activeColor")[0];
        for(var l=0;l<ziarry.length;l++){
            var color='<option value="'+l+'">'+ziarry[l]+'</option>'
            console.log(ziarry[l])
            ColorInit2.push(color)
        }
        // 库存：
        var jiaru=document.getElementById("jiaru");
        // 尺寸：
        for(var v=0;v<all[0].sizes.length;v++){
            var sizeActive23='<option value="'+v+'" name="'+all[0].sizes[v].sellStock+'">'+all[0].sizes[v].sizeAlias+'</option>'
            sizeActive2.push(sizeActive23)
        }
        var host=location.search.substring(location.search.indexOf("=")+1,location.search.length);
        console.log(ColorInit2)
        jiaru.onclick=function(){
           
            // 图片数据
            var image_=luaA_checkudata[0].src;
            // 描述
            var describe_hurt=subtitle.innerText;
            // 颜色描述
            var activeColor=document.getElementsByClassName("activeColor")[0];
            // 颜色被选中的名字
            console.log(activeColor)
            var ColorInit23=activeColor.getAttribute("name");
            // 尺寸
            // console.log(ArrayDeque)
            // 多少件
            var NumberExecutes=of_get_regulation_constraints.innerHTML;
            // 库存：每件的库存
            var PROFITS=sizeof.innerText;
            // 单价
            var discountPrice=document.getElementById("discountPrice")
            var UnitTypes=discountPrice.innerHTML;
            console.log(1)
            var ArrayDeque=null;
            // 尺寸
            var sizeActive=getSize.getElementsByClassName("sizeActive")[0];
            // console.log(sizeActive);
            ArrayDeque=sizeActive.innerText;
            console.log(ArrayDeque)
            // console.log(sizeActive.innerText)

            // 存数据进cookie
            
            
                     var userobj={
                username:host,
                image:image_,
                describe_hurt:describe_hurt,
                ColorInit:ColorInit2,
                ArrayDeque:ArrayDeque,
                NumberExecutes:NumberExecutes,
                PROFITS:PROFITS,
                discountPrice:UnitTypes,
                ColorInit1:ColorInit23,
                sizeActive2:sizeActive2

                };
                obj = JSON.stringify(userobj);
                localStorage.setItem(host,obj);

                alert("成功加入购物车。")
            
                   

            
        }


        //立即购买
        var buyNow=document.getElementsByClassName("buyNow")[0];
        buyNow.onclick=function(){
             // 图片数据
             var image_=luaA_checkudata[0].src;
             // 描述
             var describe_hurt=subtitle.innerText;
             // 颜色描述
             var activeColor=document.getElementsByClassName("activeColor")[0];
             // 颜色被选中的名字
             console.log(activeColor)
             var ColorInit23=activeColor.getAttribute("name");
             // 尺寸
             // console.log(ArrayDeque)
             // 多少件
             var NumberExecutes=of_get_regulation_constraints.innerHTML;
             // 库存：每件的库存
             var PROFITS=sizeof.innerText;
             // 单价
             var discountPrice=document.getElementById("discountPrice")
             var UnitTypes=discountPrice.innerHTML;
             console.log(1)
             var ArrayDeque=null;
             // 尺寸
             var sizeActive=getSize.getElementsByClassName("sizeActive")[0];
             // console.log(sizeActive);
             ArrayDeque=sizeActive.innerText;
             console.log(ArrayDeque)
             // console.log(sizeActive.innerText)
 
             // 存数据进cookie
            var userobj={
                username:host,
                image:image_,
                describe_hurt:describe_hurt,
                ColorInit:ColorInit2,
                ArrayDeque:ArrayDeque,
                NumberExecutes:NumberExecutes,
                PROFITS:PROFITS,
                discountPrice:UnitTypes,
                ColorInit1:ColorInit23,
                sizeActive2:sizeActive2

                };
                obj = JSON.stringify(userobj);
                localStorage.setItem(host,obj);

            location.href="购物车.html";
        }
    }

})

// 详情页渲染：
var address=location.search.substring(location.search.indexOf("=")+1);
var goodsFrame=document.getElementById("goodsFrame")
console.log(address)
$.ajax({
    url: "json/MetaData.json",
    type: "GET",
    dataType: "json",
    async:true,
    success: function (re) {
        // console.log(re)
        for(var i=0;i<re.data.length;i++){
            if(re.data[i].pid==address){
                goodsFrame.src=re.data[i].iframe;
            }
        }
    }
})

// 热销推荐 
var Photography=document.getElementById("Photography")
$.ajax({
    url:"https://www.jackjones.com.cn/api/goods/dmpRecommendGoods?projectName=detailPage&brand=two&userId=&itemId=218321507C00&brandCode=JACKJONES",
    type:"GET",
    dataType:"json",
    async:true,
    success:function(re){
        console.log(re)
        var str="";
        for(var i=0;i<re.data.length;i++){
            str+= '<li>'
            +'<a href="商品详细.html?design='+re.data[i].colorCode+'" target="_blank">'
                +'<div class="hotImg">'
                    +'<img src="https://cdn.bestseller.com.cn'+re.data[i].picurls[0]+'" alt="">'
                +'</div>'

                +'<div class="hotAllPrice">'
                    +'<span class="hotOriginalPrice font14">'
                    +' <span class="font12">￥</span>'
                    + ' <span>'+re.data[i].price+'</span>'
                + '</span>'
            + '</div>'
            '</a>'
        +'</li>'
        }
        var goNext=document.getElementsByClassName("goNext")[0];
        var goPrevious=document.getElementsByClassName("goPrevious")[0];
        Photography.innerHTML=str;
        var arr=[0,1,2];
        var x=0;
        var shang="";
        // 点击切换
        goNext.onclick=function(){
            for(var h=0;h<3;h++){
                x++;
                shang+= '<li>'
                    +'<a href="商品详细.html?design='+re.data[0+x].colorCode+'" target="_blank">'
                        +'<div class="hotImg">'
                            +'<img src="https://cdn.bestseller.com.cn'+re.data[0+x].picurls[0]+'" alt="">'
                        +'</div>'

                        +'<div class="hotAllPrice">'
                            +'<span class="hotOriginalPrice font14">'
                            +' <span class="font12">￥</span>'
                            + ' <span>'+re.data[0+x].price+'</span>'
                        + '</span>'
                    + '</div>'
                    '</a>'
                +'</li>'
            }
            // console.log(re.data[0+x].picurls[0])
            Photography.innerHTML=shang;
            var Photographyli=Photography.getElementsByTagName("li")
            // console.log(Photographyli.length)
            for(var b=0;b<Photographyli.length-3;b++){
                Photographyli[b].style.display="none";
                
            }
        }
        // 点击切换2
        var xia="";
        console.log(goPrevious)
        console.log(1)
        var jia1=0;
        goPrevious.onclick=function(){
            for(var h=0;h<3;h++){
                // x++;
                 jia1++;
                xia+= '<li>'
                    +'<a href="商品详细.html?design='+re.data[50-jia1].colorCode+'" target="_blank">'
                        +'<div class="hotImg">'
                            +'<img src="https://cdn.bestseller.com.cn'+re.data[50-jia1].picurls[0]+'" alt="">'
                        +'</div>'

                        +'<div class="hotAllPrice">'
                            +'<span class="hotOriginalPrice font14">'
                            +' <span class="font12">￥</span>'
                            + ' <span>'+re.data[50-jia1].price+'</span>'
                        + '</span>'
                    + '</div>'
                    '</a>'
                +'</li>'
            }
            Photography.innerHTML=xia;
            console.log(xia)
            // jia1++;
            var Photographyli=Photography.getElementsByTagName("li")
            console.log(Photographyli.length)
            for(var b=0;b<Photographyli.length-3;b++){
                Photographyli[b].style.display="none";
            }
            

        }
    }
})
$.when(
    
)

// 猜你喜欢
var dolike=document.getElementById("dolike")
$.ajax({
    url:"https://www.jackjones.com.cn/api/goods/dmpRecommendGoods?projectName=firstPageHot&brand=two&userId=&itemId=&brandCode=JACKJONES",
    type:"GET",
    dataType:"json",
    async:true,
    success:function(re){
        console.log(re)
        str3="";
        for(var i=0;i<30;i++){
            str3+= '<li>'
            +'<a href="商品详细.html?design='+re.data[i].colorCode+'" target="_blank">'
                +'<div class="hotImg">'
                    +'<img src="https://cdn.bestseller.com.cn'+re.data[i].picurls[0]+'" alt="">'
                +'</div>'

                +'<div class="hotAllPrice">'
                    +'<span class="hotOriginalPrice font14">'
                    +' <span class="font12">￥</span>'
                    + ' <span>'+re.data[i].price+'</span>'
                + '</span>'
            + '</div>'
            '</a>'
        +'</li>'
        }
        dolike.innerHTML=str3;
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





