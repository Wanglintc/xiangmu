class axios {
    static get (url,data,cb){
     axios.http('get',url,data,cb);
    };
    static post (url,data,cb){
     axios.http('post',url,data,cb);
    };
    static http (type,url,data,cb){
      //处理map形式的值给param    key=val$key=val
     let param='';
     data.forEach((val,key)=>{
         param +=`${key}=${val}&`
     })
     param=param.substr(0,param.length-1)
    
     // console.log(param);
     //判断type的值  是get 就把param的值+给url上，并让param为空
     if (type =='get') {
         url = `${url}?${param}`;
         param = '';
     }
     let xhr = new XMLHttpRequest();
     xhr.open(type,url);
     //判断type为post  就加上设置开头 
     type =='post'&&xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
     //  此处的param做过处理  为get param为空  否则  param为      key=val$key=val
     xhr.send(param);
     xhr.onload = function () {
         //以jion格式的方法传给cb函数
         let res = JSON.parse(xhr.response);
         cb(res);
     }
    }
}      
