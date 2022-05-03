class Register{
    constructor(){
        //当input框改变内容时  判断input框的对错
        this.$('.reg_form').addEventListener('input',this.inputFN.bind(this));
        //给完成注册绑定点击事件
        this.$('.over').addEventListener('click',this.registeredFn.bind(this));
    }
    // input框改变内容时的函数
    inputFN(e){
        //当用户昵称框改变时(1到10个中文名称)
        if (e.target.id=='tel') {
            // console.log(123);
            //确定正则
            let res = /^[\u4e00-\u9fa5]{1,10}$/;
            if (res.test(e.target.value)) {
                e.target.nextElementSibling.innerHTML='';
                // console.log(e.target.nextElementSibling);
        }else{
            e.target.nextElementSibling.innerHTML='<i class="hint_icon"></i>请输入中文！'
        }      
        }
        //当用户名框改变时  中文 数字 字母 下划线
        if (e.target.id=='code') {
            // console.log(123);
            //确定正则
            let res = /[\u4e00-\u9fa5] |\w/g;
            if (res.test(e.target.value)) {
                e.target.nextElementSibling.innerHTML='';
        }else{
            e.target.nextElementSibling.innerHTML='<i class="hint_icon"></i>请输入用户名！'
        }      
        }
        //当密码框改变时  非空白的字符
        if (e.target.id=='psw') {
            let res = /\S{6,15}/g;
            if (res.test(e.target.value)) {
                e.target.nextElementSibling.innerHTML='';   
            }else{
            e.target.nextElementSibling.innerHTML='<i class="hint_icon"></i>请输入6~16位密码!'
            }    
            //找到的是数字  是弱等级
           /* if (e.target.value.search(/0-9/g)!=-1) {
               this.$('.ruo').style.display = 'block';
               this.$('.zhong').style.display = 'none';
               this.$('.qiang').style.display = 'none';
            }
            //找到字母  是中等级
            if (e.target.value.search(/[a-z][A-Z]/g!=-1)) {
                this.$('.zhong').style.display = 'block';
                this.$('.ruo').style.display = 'none';
                this.$('.qiang').style.display = 'none';
            }
            if (e.target.value.search(/\W/g!=-1)){
                //找到字母是高等级
                this.$('.ruo').style.display = 'none';
                this.$('.qiang').style.display = 'none';
                this.$('.zhong').style.display = 'block';
            } */
        }
        //当确认密码框改变时  必须和密码框一致
        if (e.target.id=='repsw') {
            if(e.target.value==this.$('#psw').value){
                e.target.nextElementSibling.innerHTML='<em>密码一致!</em>';
            }else{
                e.target.nextElementSibling.innerHTML='<i class="hint_icon"></i>密码不一致!'
            }
        }
    }

    //点击事件
    async registeredFn(){
        //获取post传参的数据
        let username = this.$('#code').value;
        let  password = this.$('#psw').value;
        let  rpassword = this.$('#repsw').value;
        let nickname = this.$('#tel').value;
        //确定协议框选中
        // console.log(this.$('.agree input').checked);
        if (this.$('.agree input').checked) {
            let param = `username=${username}&password=${password}&rpassword=${rpassword}&nickname=${nickname}`;
           let res = await axios.post('http://localhost:8888/users/register',param) ;
           console.log(res);
        let { data ,status}=res;
        if(status==200){
            if (data.code==1) {
                location.assign('./login.html?ReturnUrl=./index.html')
            }
        }
        }else{
            alert('请签署协议');
        }
    }










    //获取节点函数
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
      }
}

new Register;