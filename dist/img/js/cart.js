function Cart(){
    this.$cartList = $('.cartList');
    this.init();
}
Cart.prototype.init = function(){
    //获取cookie
    let cookie_str = $.cookie('products') ? $.cookie('products') : '';
    //转对象
    let cookie_obj = convertStrToObj(cookie_str);
    //遍历 对象
    for(let key in cookie_obj){
        let goods = cookie_obj[key];
        this.$cartList.append(`
            <ul class="goodInfo" data-good-id="${key}">
				<li><img src="${goods.src}" /></li>
				<li>${goods.name}</li>
				<li>${goods.price}</li>
				<li class="num">
					<a href="javascript:;" class="minus">-</a>
					<input type="text" name="" id="" value="${goods.num}" />
					<a href="javascript:;" class="plus">+</a>
				</li>
				<li class="total">${goods.price * goods.num}</li>
				<li><a href="javascript:;" class="del">删除</a></li>
			</ul>
        `)
    }
    //获取所有的-
    $('.minus').each(function(){
        
        $(this).click(function(){
            
            //获取id
            let id = $(this).parents('.goodInfo').attr('data-good-id');
            
            //获取cookie
            let cookie_str = $.cookie('products') ? $.cookie('products') : '';
            //转对象
            let cookie_obj = convertStrToObj(cookie_str);
            // console.log(cookie_obj);
            if(cookie_obj[id].num > 1){
                cookie_obj[id].num --;
            }
            //存入cookie
            $.cookie('products',JSON.stringify(cookie_obj),{expires: 7,path: '/'});
            $(this).next().val(cookie_obj[id].num);
            $(this).parent().next().text(cookie_obj[id].price * cookie_obj[id].num);
        })
    })
    //获取所有的+
    $('.plus').each(function(){
        $(this).click(function(){
            
            //获取id
            let id = $(this).parents('.goodInfo').attr('data-good-id');
            
            //获取cookie
            let cookie_str = $.cookie('products') ? $.cookie('products') : '';
            //转对象
            let cookie_obj = convertStrToObj(cookie_str);
            // console.log(cookie_obj);
        
                cookie_obj[id].num ++;
        
            //存入cookie
            $.cookie('products',JSON.stringify(cookie_obj),{expires: 7,path: '/'});
            $(this).prev().val(cookie_obj[id].num);
            $(this).parent().next().text(cookie_obj[id].price * cookie_obj[id].num);
        })
    })

    //获取所有的数量框
    $('.num>input').each(function(){
        $(this).blur(function(){
            
            //获取id
            let id = $(this).parents('.goodInfo').attr('data-good-id');
            
            //获取cookie
            let cookie_str = $.cookie('products') ? $.cookie('products') : '';
            //转对象
            let cookie_obj = convertStrToObj(cookie_str);
            let num = $(this).val();
            if(/^\d+$/.test(num) && num > 0){
                cookie_obj[id].num = num;
            }else{
                cookie_obj[id].num = 1;
            }
            
            //存入cookie
            $.cookie('products',JSON.stringify(cookie_obj),{expires: 7,path: '/'});
            $(this).val(cookie_obj[id].num);
            $(this).parent().next().text(cookie_obj[id].price * cookie_obj[id].num);
        })
    })

    //获取所有的-
    $('.del').each(function(){
        $(this).click(function(){
            
            //获取id
            let id = $(this).parents('.goodInfo').attr('data-good-id');
            
            //获取cookie
            let cookie_str = $.cookie('products') ? $.cookie('products') : '';
            //转对象
            let cookie_obj = convertStrToObj(cookie_str);
            delete cookie_obj[id];

            //存入cookie
            $.cookie('products',JSON.stringify(cookie_obj),{expires: 7,path: '/'});
            $(this).parents('.goodInfo').detach();
            
        })
    })
}

new Cart();