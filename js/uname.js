class Uname{
    constructor(){
        // 操作购物车页面
        this.token();
    }
    //操作购物车页面
    async token(){
        //token值是判断用户此时是否登陆过
        const token = localStorage.getItem('token');
         //获取用户id值
         let uname= localStorage.getItem('user_id');
         //发送的是用户详细信息 用来判断用户是否登录过期 用户登录过期只有发送请求才可以获取
        let res = await axios.get(`http://localhost:8888/cart/list?id=${uname}`);
        // console.log(res);
        if (!token ||res.data.code==401) {
            location.assign('./login.html?ReturnUrl=./cart.html');
        }
    }
}
new Uname;