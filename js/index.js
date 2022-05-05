class Index{
    constructor(){
        //设置全局变量  保存定时器
        this.times ;
        //保存当前的图片的索引
        this.index = 0;
        //保存上一张图片的索引
        this.lastIndex = 0;
        //轮播图的实现
        this.ShufflingFigureFn();
        //倒计时的实现
        this.theCountdownFn();
    }   
    //轮播图的实现
    ShufflingFigureFn(){
        //定时器的实现
        this.autoPlay();
         //给下一个绑定点击事件
         this.$('.arrow-r').addEventListener('click',this.nextonclick.bind(this));
         //给上一个绑定点击事件
         this.$('.arrow-l').addEventListener('click',this.prevonclick.bind(this));
         //鼠标移入  轮播图停止
        this.$('.grid-col2-t').addEventListener('mouseover',this.overFn.bind(this));
        //鼠标移出  轮播图继续
        this.$('.grid-col2-t').addEventListener('mouseout',this.outFn.bind(this));

    }
    //设置一个定时器  1s后执行下一张的点击事件
    autoPlay(){
        this.times = setInterval(()=>{
            this.nextonclick();
        },1000)
    };
    //上一个的点击事件
    prevonclick(){
        //保存上一个的索引
        this.lastIndex  = this.index;
        //索引--
        this.index--;
        // console.log(this.index);
        //判断范围
        if (this.index<0) {
            this.index=3
        }
        this.change();
    }
    //下一个的点击事件
    nextonclick(){
         //保存上一个的索引
        this.lastIndex  = this.index;
        //索引++
        this.index++;
         //判断范围
        if (this.index>3) {
            this.index=0
        }
        this.change();
    }
    //图片的出现
    change(){
        //那个图片出现   就让他的索引有ca这个类
        this.$('.t-img li')[this.lastIndex].className = '';
        this.$('.t-img li')[this.index].className = 'ca';
    }
    //鼠标移入关闭定时器
    overFn(){
        clearInterval(this.times);
    }
    //鼠标移除开启定时器
    outFn(){
        this.autoPlay();
    }
    //倒计时的实现
    theCountdownFn(){
        
    }


    //获取节点函数
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
      }
}
new Index;