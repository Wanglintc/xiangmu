class list{
    constructor(){
        //获取商品列表  默认一页20条
        this.getData();
        //给商品列表的加入购物车  绑定事件
        this.$('.sk_bd ul').addEventListener('click', this.clickAddFn.bind(this))
}
    //获取数据
    async getData(a=1){
    //发送异步请求  获取商品值  20
    let { data , status} = await axios.get(`http://localhost:8888/goods/list?current${a}=&pagesize=20`);
    // console.log(data,status);
    //判断status是否为200
    if (status == 200) {
        //追加到页面中
        let html = '';
        data.list.forEach(goods => {
          // console.log(goods);
          html += `<li class="sk_goods" data-id="${goods.goods_id}">
          <a href="detail.html"><img src="${goods.img_big_logo}" alt=""></a>
          <h5 class="sk_goods_title">${goods.title}</h5>
          <p class="sk_goods_price"><em>¥${goods.current_price}</em> <del>￥${goods.price}</del></p>
          <div class="sk_goods_progress">
              已售<i>${goods.sale_type}</i>
              <div class="bar">
                  <div class="bar_in"></div>
              </div>
              剩余<em>${goods.goods_number}</em>件
          </div>
          <a href="#none" class="sk_goods_buy">立即抢购</a>
      </li>`;
  
        });
        this.$('.sk_bd ul').innerHTML = html;
      }
  
    
    }
    //加入购物车的事件12
    async clickAddFn(e){
        //判断用户是否登录   
        //用户登录会保存localStorage值
        let token = localStorage.getItem('token');
        // console.log(token);
        //未登录就会跳转登录页面   设定的参数还会返回到这个页面
        //location.assign (url) 跳转到这个页面  能后退
        if (!token){ location.assign('./login.html?ReturnUrl=./list.html');}
        //判断点击的是否是  立即抢购
        if (e.target.className=='sk_goods_buy') {
            //获取商品id或用户id获取
            let goodsId =e.target.parentNode.dataset.id;
            let  unameId = localStorage.getItem('user_id');
            // console.log(goodsId,unameId );
            //检查2个id是否都获取到
            if(!unameId || !goodsId) throw new Error('请检查2个id');
            //设置请求头
            axios.defaults.headers.common['authorization'] = token;
            // 必须设置内容的类型,默认是json格式,server 是处理不了
            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            // post 传值  
            let param = `id=${unameId}&goodsId=${goodsId}`;
            let res=await axios.post('http://localhost:8888/cart/add',param);
            // console.log(res);
            //获取返回到的值
            let { data , status }=res;
            //判断请求成功
            if (status==200) {
                //判断成功获取到的参数
                if (data.code==1) {
                    // 跳转到 购物车 页面
                    location.assign('./cart.html');
                }
            }
        }

    }






















    //获取节点
    $(tag) {
         let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }

}
new list;