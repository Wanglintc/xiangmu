
class login{
    constructor(){
        // 给登录绑定点击事件  
        this.$('.over').addEventListener('click',this.clickButtonFn.bind(this));
    }
    //登录的点击事件
    clickButtonFn(){
         //判断用户名和密码格式是否错误
        if (!this.$('#uname').value.trim()) {
            this.$('.forgot span').innerText = '请输入用户名';
            return;
        }
        if (!this.$('#password').value.trim()) {
            this.$('.forgot span').innerText = '请输入密码';
            return;
        }

        //获取用户名和密码的值
       const uname = this.$('#uname').value;
       const pwd = this.$('#password').value;
        //console.log(uname,pwd);
        //以map的形式传值
        let map = new Map();
        map.set('username',uname);
        map.set('password',pwd);
        axios.post('http://localhost:8888/users/login',map).then(res =>{
            console.log(res);
        })
    }
    //获取节点函数
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
      }
}
new login;