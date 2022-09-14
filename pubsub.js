class PubSub{
    constructor(){
        this._events = {};
    }

    // 注册
    subscribe(event,callback){
       if(this._events[event]){
        //    如果当前event存在,所以我们只需要在后面添加当前次监听操作
        this._events[event].push(callback)
       }else{
        //    之前没有订阅过此事件
        this._events[event] = [callback];
       }
    }

    // 发布
    publish(event,...args){
        const items = this._events[event];
        if(items && items.length){
            items.forEach(function(callback){
                callback.call(this,...args)
            })
        }
    }
    unsubscribe(event,callback){
        if(!this._events.hasOwnProperty(event) || this._events[event].length == 0){
            return;
        }
       let pos =  this._events[event].indexOf(callback);
       if(pos !== -1){
        this._events[event].splice(pos,1)
       }
    }
}
