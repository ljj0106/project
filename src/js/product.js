function Product(){
    //购物车按钮
    this.$cart = $('#buy');
    //购买按钮
    this.$buys = $('.addToCart');
    //添加事件
    this.addEvent();
    //初始化页面数据
    this.init();
}
Product.prototype = {
    constructor: Product,
    addEvent: function(){
        //记录this
        let that = this;
        this.$cart.click(() => {
            location.href = 'cart.html';
        })
        this.$buys.each(function(){
            $(this).on('click',function(event){
                //商品id
                let good_id = $(this).parent().attr('data-good-id');
                //商品名
                let good_name = $(this).prev().prev().text();
                //商品价格
                let good_price = parseInt($(this).prev().text());
                //商品图片
                let good_src = $(this).siblings('img').attr('src');
                //设计
                //key : 'products'
                //value: '{"sp1":{name:"xx","price":xx,"src":"xx",num:"xx"}}'
                //获取后端数据
                let cookie_str = $.cookie('products') ? $.cookie('products') : '';
                //转对象
                let cookie_obj = convertStrToObj(cookie_str);
                //判断当前购买的商品是否已购买过
                if(good_id in cookie_obj){
                    //找到数量 + 1
                    cookie_obj[good_id].num ++;
                }else{
                    cookie_obj[good_id] = {
                        "name" : good_name,
                        "price" : good_price,
                        "src" : good_src,
                        "num" : 1
                    }
                }
                //存入cookie
                $.cookie('products',JSON.stringify(cookie_obj),{expires: 7,path: '/'});

                //飞入购物车
                let $img = $(this).siblings('img').clone().css({width: 50,height: 50});
                $img.fly({
                    start: {
                        left: event.pageX,
                        top: event.pageY
                    },
                    end: {
                        left: that.$cart.offset().left,
                        top: that.$cart.offset().top,
                        width: 0,
                        height: 0
                    },
                    onEnd: function(){
                        let num = /(\d+)/.exec(that.$cart.val())[1];
                        that.$cart.val(`购物车(${++ num})`);
                    }
                });
            })
        })
    },
    init: function(){
        //获取cookie
        let cookie_str = $.cookie('products') ? $.cookie('products') : '';
        //转对象
        let cookie_obj = convertStrToObj(cookie_str);
        //总数
        let sum = 0;
        for(let key in cookie_obj){
            sum += cookie_obj[key].num;
        }
        this.$cart.val(`购物车(${sum})`);
    }
}
new Product();