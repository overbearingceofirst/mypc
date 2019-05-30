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


// 获取购物车内容：
var arr=[];
for(i=0;i<localStorage.length;i++){
       var hh=localStorage.getItem(localStorage.key(i));
       hh=JSON.parse(hh);
       arr.push(hh)  
}

var cartCompleted=document.getElementById("cartCompleted")
var lengths=document.getElementsByClassName("lengths")[0];
if(arr==[]){
    cartCompleted.innerText="0";
    lengths.innerText="0";
}else{
    cartCompleted.innerText=arr.length;
    lengths.innerText=arr.length;
}
var filterList=document.getElementById("filterList")
var str="";
// console.log(arr)
    for(var k=0;k<arr.length;k++){
        str+='<tr class="width100" style="border:1px solid #000" name="'+arr[k].username+'">'
        +'<td class="width100">'
           +' <div class="width100 floatLeft tbodyTe">'
                +'<div class="carImg floatLeft">'
                   +' <input type="checkbox" style="margin: -6% 5px 0 0;" class="Radiogroup">'
                    +'<span class="goodeImgxj">'
                        +'<!-- 下架图片 -->'
                        +'<img src="img/xj.06b31b9b.png" alt="" class="disblokNone">'
                        +'<img src="'+arr[k].image+'" alt="" class="imageall">'
                    +'</span>'
                +'</div>'
                +'<div class="carTitle floatLeft textCenter">'
                    +'<div class="width100">'+arr[k].describe_hurt+'</div>'
                   + '<div class="width100 isStaffText"></div>'
                +'</div>'
                +'<div class="carSelectCol floatLeft textCenter" style="margin-left: 15px;">'
                        +'<select id="goodsColor1" class="goodsColor" >'
                           + arr[k].ColorInit
                        +'</select>'
                +'</div>'
                +'<div class="carSelectCol floatLeft textCenter" style="margin-left: 0px;">'
                        +'<select id="goodsSize1" class="goods-size">'
                            +arr[k].sizeActive2
                        +'</select>'
                +'</div>'
               +' <div class="carGoodsNum floatLeft">'
                   +' <div class="ovf selectNum" style="margin-left: 19%;">'
                        +'<input class="num textCenter number-snip" style="outline:none;" value="'+arr[k].NumberExecutes+'">'
                       + '<div class="uodown">'
                            +'<div class="textCenter upward" id="first-of">'
                                +'<i class="fa fa-angle-up chevron-up textCenter"><i class="glyphicon glyphicon-chevron-up" style="font-size: 12px;"></i></i>'

                           +' </div>'
                            +'<div class="textCenter CDown" id="first-of">'
                               +' <i class="fa fa-angle-up chevron-up textCenter"><i class="glyphicon glyphicon-chevron-down" style="font-size: 12px;"></i></i>  '
                           +' </div>'
                       + '</div>'
                   + '</div>'
                    +'<span class="stocks">'
                        
                       +' 库存：<span class="sellStocks">'+arr[k].PROFITS+'</span>件'
                    +'</span>'
               + '</div>'
               + '<div class="carGoodsUnitPrice floatLeft" style="margin-left: -12px;">'
                  + ' <p class="unitPrice textCenter">'
                           + '￥<span class="setUnitPrice">'+arr[k].discountPrice+'</span>'
                   + '</p>'
                +'</div>'
                +'<div class="carGoodsUnitPrice floatLeft" style="margin-left: 0px;">'
                    +'<p class="unitPrice textCenter">'
                            +'￥<span class="getPrice">'+arr[k].discountPrice*arr[k].NumberExecutes+'</span>'
                   +' </p>'
                +'</div>'
                +'<div id="2235687" class="delete floatRight" style="margin-left: 72px;">从购物车中删除</div>'
            +'</div>'
            +'<div class="width100 floatLeft deleteT"></div>'
        +'</td>'
   +' </tr>'
    }
    filterList.innerHTML=str;
    
    // 设置选中的色号
    var value=document.getElementsByClassName("goodsColor");
    for(var r=0;r<value.length;r++){
        
        var valuecolor=value[r].getElementsByTagName("option");
        for(var n=0;n<valuecolor.length;n++){
             if(arr[r].ColorInit1==valuecolor[n].innerText){
                valuecolor[n].selected=true;
             }
        }
    }

    // 设置选中的码数：
    var size=document.getElementsByClassName("goods-size");
    for(var z=0;z<size.length;z++){
        var sizevalue=size[z].getElementsByTagName("option");

        for(var s=0;s<sizevalue.length;s++){
             if(arr[z].ArrayDeque==sizevalue[s].innerText){
                 sizevalue[s].selected=true;
             }
        }
    }


    // 点击切换商品：
    var selectvalue=0;
    var shangp=[];
    for(var k=0;k<arr.length;k++){
        var myhash=arr[k].username.substring(0,arr[k].username.length-3);
        // console.log(myhash)
        // 先渲染，然后通过点击切换；
        $.ajax({
                url: "https://cdn.bestseller.com.cn/detail/JACKJONES/"+myhash+".json",
                type: "get",
                // date:{},
                dataType: "json",
                success: function (rs) {
                    var ff=rs.data.color
                    shangp.push(rs.data)
                    // console.log(shangp)
                    var goodeImgxj=document.getElementsByClassName("imageall");
                    var number_snip=document.getElementsByClassName("number-snip")
                    // console.log(goodeImgxj)
                    // 点击切换颜色图片
                    for(var x=0;x<value.length;x++){
                        value[x].index=x;
                        value[x].onchange=function(){
                            // console.log(1)
                            var trstr="";
                            // 得到当前的值了
                            selectvalue=this.options[this.options.selectedIndex].value;
                            // console.log(selectvalue)
                            var all2=shangp[this.index].color[selectvalue]
                            var all3=shangp[this.index]
                            // console.log(all2)
                            // console.log(all3)
                            // 获取当前的图片,更换
                            // console.log(goodeImgxj[this.index].src)
                            goodeImgxj[this.index].src="https://cdn.bestseller.com.cn"+all2.picurls[0];
                            // 指向当前的tr元素
                            var goods=document.getElementsByClassName("goods-size");
                            // 套吃多一层获取出当前的selectvalueid
                            move();
                                  
                        }

                       
                    
                    }
                    // 库存的下标
                    var sellStocks=document.getElementsByClassName("sellStocks")
                    // console.log(sellStocks)
                    // 库存控制
                    move();


                    // 超级总价
                    var getTotal=document.getElementsByClassName("getTotal")[0]
                    //input款
                    var Radiogroup=document.getElementsByClassName("Radiogroup");
                    // 全选：
                    var selectAll=document.getElementById("selectAll");
                    var footerBox=document.getElementById("footerBox");
                    var lll=0;
                    selectAll.onchange=function(){
                        if(selectAll.checked==true){
                            footerBox.checked=true;
                            for(var h=0;h<Radiogroup.length;h++){
                                Radiogroup[h].checked=true;
                                lll+=Number(getPrice[h].innerText);
                            }
                            getTotal.innerHTML=lll;

                        }else{
                            footerBox.checked=false;
                            for(var h=0;h<Radiogroup.length;h++){
                                Radiogroup[h].checked=false;
                            }
                        }
                    }

                    footerBox.onchange=function(){
                        if(footerBox.checked==true){
                            selectAll.checked=true;
                            for(var h=0;h<Radiogroup.length;h++){
                                Radiogroup[h].checked=true;
                                lll+=Number(getPrice[h].innerText);
                                
                            }
                            getTotal.innerHTML=lll;
                        }else{
                            selectAll.checked=false;
                            for(var h=0;h<Radiogroup.length;h++){
                                Radiogroup[h].checked=false;
                            }
                        }
                    }
                    

                    // 小项目都全选的话，上面也全选
                    for(var h=0;h<Radiogroup.length;h++){

                    }

                    // 向上点击控制 加：
                    var number_snip=document.getElementsByClassName("number-snip")
                    // console.log(number_snip)
                    var upward=document.getElementsByClassName("upward");

                    // console.log(upward)
                    for(var o=0;o<upward.length;o++){
                        upward[o].index=o;
                        upward[o].onclick=function(){
                            move();
                            if(sellStocks[this.index].innerText>0){
                                 console.log(number_snip[this.index])
                                if(number_snip[this.index].value<sellStocks[this.index].innerText){
                                    number_snip[this.index].value++;
                                    console.log(sellStocks[this.index].innerText)
                                    console.log(number_snip[this.index].value)
                                }else if(number_snip[this.index].value>sellStocks[this.index].innerText){
                                    number_snip[this.index].value=sellStocks[this.index].innerText;
                                }
                            }else{
                                number_snip[this.index].value=0;
                            }
                            // 单价：
                            var setUnitPrice=document.getElementsByClassName("setUnitPrice");
                            // 总价：
                            var getPrice=document.getElementsByClassName("getPrice")
                            getPrice[this.index].innerText=Number(setUnitPrice[this.index].innerText)*Number(number_snip[this.index].value);
                            var ss=0;

                            for(var h=0;h<Radiogroup.length;h++){
                                if(Radiogroup[h].checked==true){
                                    ss+=Number(getPrice[h].innerText);
                                }
                            }
                            getTotal.innerHTML=ss;
                            
                        }
                    }

                    // 向下点击控制  减：
                    var CDown=document.getElementsByClassName("CDown");
                    // console.log(CDown);
                    for(var o=0;o<CDown.length;o++){
                        CDown[o].index=o;
                        CDown[o].onclick=function(){
                            move()
                            if(sellStocks[this.index].innerText>0){
                            // console.log(number_snip[this.index])
                                if(number_snip[this.index].value>1){
                                    number_snip[this.index].value--;
                                }else if(number_snip[this.index].value<1){
                                    number_snip[this.index].value=1;
                                }
                            }else{
                                number_snip[this.index].value=0;
                            }
                             // 单价：
                             var setUnitPrice=document.getElementsByClassName("setUnitPrice");
                             // 总价：
                             var getPrice=document.getElementsByClassName("getPrice")
                             getPrice[this.index].innerText=Number(setUnitPrice[this.index].innerText)*Number(number_snip[this.index].value);
                             var hhh=0;

                            for(var h=0;h<Radiogroup.length;h++){
                                if(Radiogroup[h].checked==true){
                                    hhh+=Number(getPrice[h].innerText);
                                }
                            }
                            getTotal.innerHTML=hhh;
                            
                            
                        }
                    }

                    // 删除：
                    var goingToDelete =document.getElementsByClassName("delete")
                    // var tr=this.parentElement.parentElement.parentElement.parentElement;

                    for(var w=0;w<goingToDelete.length;w++){
                        goingToDelete[w].index=w;
                        goingToDelete[w].onclick=function(){
                            this.parentElement.parentElement.parentElement.remove();
                            console.log(this.index)
                            // 删除数据
                            localStorage.removeItem(localStorage.key(this.index));
                            alert("删除成功！")
                            // 自带刷新，不然下标会乱
                            window.location.reload()
                        }
                    }
                    var getTotal=document.getElementsByClassName("getTotal")[0]
                    console.log(getTotal)
                    // 选中。结算
                    var shu=[];
                    var bb=0;
                    var getPrice=document.getElementsByClassName("getPrice")
                    var Radiogroup=document.getElementsByClassName("Radiogroup");
                    console.log(Radiogroup)
                    for(var h=0;h<Radiogroup.length;h++){
                        Radiogroup[h].index=h;

                        Radiogroup[h].onchange=function(){
                            if(this.checked==true){
                                var shuz=Number(getPrice[this.index].innerText);
                                shu.push(shuz)
                            }
                            console.log(shu)
                            for(var m=0;m<shu.length;m++){
                                bb+=shu[m];
                                getTotal.innerHTML=bb;
                            }
                            getTotal.innerHTML=bb;
                            
                        }
                        
                    }
                    var xx=[];
                    // 要是改变的策略：
                    for(var h=0;h<Radiogroup.length;h++){
                        if(Radiogroup[h].checked==true){
                            xx.push(h);
                        }
                    }
                    console.log(xx)
                    

                }

            })
    }
    var settlementBtn=document.getElementById("settlementBtn");
    settlementBtn.onclick=function(){
        alert("结算成功！")
        location.href="首页.html";
    }
    
    function move(){
           // 点击切换当前码数的库存
           for(var z=0;z<size.length;z++){
               // 当前下标位置，代表当前的库存；
               var number_snip=document.getElementsByClassName("number-snip")
               var sellStocks=document.getElementsByClassName("sellStocks")
               size[z].index=z;
               size[z].onchange=function(){
                   // 当前点击的那个下标
                    var selectvalue2=this.options[this.options.selectedIndex].value;
                    // console.log(selectvalue2)
                    // console.log(selectvalue)
                    var all2=shangp[this.index].color[selectvalue]
                    var all3=shangp[this.index]
                    // 获取当前的库存,更换
                    //    console.log(sellStocks[this.index].innerText)
                        // console.log(sellStocks)
                    // console.log(all2.sizes[selectvalue2].sellStock)
                    sellStocks[this.index].innerText=all2.sizes[selectvalue2].sellStock;
                    //    如果库存为0；
                    if(all2.sizes[selectvalue2].sellStock==0){
                        number_snip[this.index].value=0;
                    }else{
                        number_snip[this.index].value=1;
                    }
                    // 单价：
                    var setUnitPrice=document.getElementsByClassName("setUnitPrice");
                    // 总价：
                    var getPrice=document.getElementsByClassName("getPrice")
                    getPrice[this.index].innerText=Number(setUnitPrice[this.index].innerText)*Number(number_snip[this.index].value);
                }
            }

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


