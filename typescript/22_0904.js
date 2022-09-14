"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
{
    const lowerDecorator = (target, propKey) => {
        let value;
        Object.defineProperty(target, propKey, {
            //定义原型对象上装饰器所装饰的属性
            // 此时装饰器所装饰的属性为 name属性
            //所以此时定义的属性为 原型对象上的name属性
            get() {
                return value;
            },
            set(newValue) {
                // 因为 set get 方法依赖 value 变量
                // 所以只要 set get 执行,那么 value 变量就不会销毁
                // 对于 set get 方法而言 value变量就是一个可以始终访问的公共变量
                value = newValue.toLowerCase();
            }
        });
    };
    class Hd {
    }
    __decorate([
        lowerDecorator,
        __metadata("design:type", Object)
    ], Hd.prototype, "name", void 0);
    let hd = new Hd();
    hd.name = "XXXsss";
    console.log(hd.name);
}
