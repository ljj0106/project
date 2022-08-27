$('.btn-wrap .text2').click(
    function () {
        location.href = '../html/login.html'
    }
)
$(function () {
    // $.cookie('login', 123)  
    // let a123 = {
    //     name: '小米充电宝',
    //     price: 129,
    //     num: 3,
    //     photo: '0.jpg'
    // }
    // $.cookie('good', `${JSON.stringify(a123)}`)
    if ($.cookie('login')) {
        $('.outline1').css('display', 'none');

        if ($.cookie('good')) {
            $('.outline2').css('display', 'none');
            $('main').css('display', 'block');
            $('footer').css('display', 'block');
            shop();
        } else {
            $('.outline2').css('display', 'block');
            $('main').css('display', 'none');
            $('footer').css('display', 'none');
        }
    } else {
        $('.outline1').css('display', 'block');
        $('main').css('display', 'none');
        $('footer').css('display', 'none');
    }
    function translate(str) {
        if (!str) {
            return {};
        }
        return JSON.parse(str);
    }
    function shop() {
        let str = $.cookie('good') ? $.cookie('good') : '';
        let obj = translate(str);
        $('main').append(`
            <div class="GoodsInfo">
            <!-- 勾选框 -->
            <div class="check" id=''></div>
            <!-- 图片 -->
            <div class="image">
                <img src="../img/${obj.photo}" alt="">
            </div>
            <!-- 商品名称 -->
            <p class="shopname">
                ${obj.name}
            </p>
            <!-- 单价 -->
            <p class="monovalent">￥${obj.price}</p>
            <!-- 商品数量 -->
            <div class="quantity">
                <div class="quantity-left">-</div>
                <input id="goodsNum" name="" value="${obj.num}">
                <div class="quantity-right">+</div>
            </div>
            <!-- 金额 -->
            <p class="price">￥${obj.price * obj.num}</p>
            <!-- 操作 -->
            <p class="operate">×</p>
        </div>
            `)
        //－
        $('.quantity-left').click(function () {
            let n = $('#goodsNum').val();
            n--;
            if (n <= 1) {
                n = 1
            }
            $('#goodsNum').val(n);
            $.cookie(
                'good', `
                    {
                        "name" : "${obj.name}" ,
                        "price" : ${obj.price} ,
                        "num" : ${n} ,
                        "photo" : "0.jpg"
                    }
                ` ,
                { path: '/', expires: 7 }
            )
            $('.price').text(`￥${obj.price * n}`)
        })
        // + 
        $('.quantity-right').click(function () {
            let n = $('#goodsNum').val();
            n++;

            $('#goodsNum').val(n);
            $.cookie(
                'good', `
                    {
                        "name" : "${obj.name}" ,
                        "price" : ${obj.price} ,
                        "num" : ${n} ,
                        "photo" : "0.jpg"
                    }
                ` ,
                { path: '/', expires: 7 }
            )
            $('.price').text(`￥${obj.price * n}`)
        })
    }


    class Checkbox {
        constructor() {
            this.check = $('.check');
            this.flag = true
            this.addEvent();
        }
        addEvent() {
            let that = this
            // alert(this.check.length);
            for (let i = 0; i < this.check.length; i++) {

                this.check.eq(i).click(function () {
                    if (that.flag) {
                        for (let i = 0; i < that.check.length; i++) {
                            that.check.eq(i).css({
                                'background': 'red',
                                'text-align': 'center'
                            })
                            that.check.eq(i).html('&#10004;');
                            that.flag = false
                        }
                    }else{
                        for (let i = 0; i < that.check.length; i++) {
                            that.check.eq(i).css({
                                'background': '',
                                'text-align': 'center'
                            })
                            that.check.eq(i).html('');
                            that.flag = true
                        }
                    }


                })
            }
        }
    }
    new Checkbox();


    //删除按钮的点击
    class Delete{
        constructor(){
            this.main = $('main');
        this.outline2  = $('.outline2');
        this.outline1 = $('.outline1');
        this.footer = $('footer');

            this.del = $('.operate');
            this.goodInfo = $('.GoodsInfo');
            this.addEvent();
        }
        addEvent(){
            let that = this ;
            //点击删除事件，删除该商品的信息
            this.del.click(function(){
                that.goodInfo.empty();
                $.removeCookie('good');
                if($.cookie('good') == false){
                    this.main.css('display','none');
                    this.footer.css('display','none');
                    this.outline1.css('display','block');
                    
                }
                location.reload();
            })
            
        }
    }
    new Delete();
})



//空购物车的页面显示
// class EmptyCart{
//     constructor(){
//         //获取元素
//         this.main = $('main');
//         this.outline2  = $('.outline2');
//         this.outline1 = $('.outline1');
//         this.footer = $('footer');
//         this.addEvent();
        
//     }
//     addEvent(){
//         if($.cookie('good') == false){
//             this.main.css('display','none');
//             this.footer.css('display','none');
//             this.outline1.css('display','block');
//             location.reload();
//         }
//     }
// }
// new EmptyCart() ;
