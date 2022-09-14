{
 
const lowerDecorator : PropertyDecorator = (target:object,propKey:string | symbol)=>{
    let value:string;
    Object.defineProperty(target,propKey,{
        //定义原型对象上装饰器所装饰的属性
        // 此时装饰器所装饰的属性为 name属性
        //所以此时定义的属性为 原型对象上的name属性
         get(){
          return value;
         },
         set(newValue:string){
            // 因为 set get 方法依赖 value 变量
            // 所以只要 set get 执行,那么 value 变量就不会销毁
            // 对于 set get 方法而言 value变量就是一个可以始终访问的公共变量
         value = newValue.toLowerCase()
         }
    })
}

class Hd{
    @lowerDecorator
    name:string | undefined
    // name 属性因为可以为 string 类型 或 undefined
    // 即 name 属性在 this 实例上可有可无
    // 因为没有给name属性初始化值,所以此时name属性为undefined ,即
    // this上没有name属性,即this(类的实例)设置/获取name属性时会去原型对象上获取/设置
}
let hd = new Hd()
hd.name = "XXXsss";
console.log(hd.name)
}
