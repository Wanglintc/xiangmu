class Pay{
    constructor(){
        //获取结算商品的列表
        this.getData();
    }
    getData(){
        //判断打开结算页面  如果未携带参数就跳回到购物车页面
        
        if (!location.search) {
            //未携带参数
            location.assign('./cart.html');
        }else{
            //携带参数
        //获取用户id
        let unama = localStorage.getItem('user_id');
        //获取商品id   此时的id是字符串  
        let goodsId =location.search;
        // console.log(goodsId);
        goodsId = goodsId.substring(1,goodsId.length);
        //把字符串改成数组
        goodsId = goodsId.split(',');
        // console.log(goodsId);
        


        //发送请求获取商品的详细信息 因为async有就近原则
        //循环数组  
        goodsId.forEach(val => {
            // console.log(val);
            //传的参数是id值
            this.axiosFn(val);
        });
        
        }
      
       
    }
    async axiosFn(a){
        let res = await axios.get(`http://localhost:8888/goods/item?id=${a}`);
        // console.log(res);

        let html =`<div class="me-bd" data-id="${res.data.info.goods_id}">
        <span>订单详情</span>
        <div class="me-bs">
            <span>
                <img src="${res.data.info.img_big_logo}" width="100px" height="100px"   alt="">
            </span>
            <p>
                ${res.data.info.title}
            </p>
            <div class="price">￥${res.data.info.price}</div>
            <div class="num">X1</div>
            <a href="#">有货</a>
        </div>
    </div>`;
    // console.log(this.$('.message'));
        this.$('.message')[3].innerHTML+=html;
        
    }

     //获取节点函数
     $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
      }

    
}


new Pay;