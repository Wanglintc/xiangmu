class Pay{
    constructor(){
        //获取结算商品的列表
        this.getData();
    }
    getData(){
        //获取用户id
        let unama = localStorage.getItem('user_id');
        //获取商品id
        let goodsId =location.search;
        // console.log(goodsId);
        goodsId = goodsId.substring(1,goodsId.length)
        goodsId = goodsId.split(',');
        // console.log(goodsId);
        //发送请求获取商品的详细信息 因为async有就近原则
        goodsId.forEach(val => {
            // console.log(val);
            this.axiosFn(val);
        });
        
       
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