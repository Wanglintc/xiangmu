class Index{
    constructor(){
        this.times ;
        this.index = 0;
        this.lastIndex = 0;
        //轮播图的实现
        this.ShufflingFigureFn();

    }   

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
    //设置一个定时器
    autoPlay(){
        this.times = setInterval(()=>{
            this.nextonclick();
        },1000)
    };
    prevonclick(){
        this.lastIndex  = this.index;
        this.index--;
        // console.log(this.index);
        if (this.index<0) {
            this.index=3
        }
        this.change();
    }
    nextonclick(){
        this.lastIndex  = this.index;
        this.index++;
        if (this.index>3) {
            this.index=0
        }
        this.change();
    }
    change(){
        this.$('.t-img li')[this.lastIndex].className = '';
        this.$('.t-img li')[this.index].className = 'ca';
    }
    overFn(){
        clearInterval(this.times);
    }
    outFn(){
        this.autoPlay();
    }
    //获取节点函数
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
      }
}
new Index;