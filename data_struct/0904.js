"use strict";
// 栈 后进先出,只从一端(栈顶)添加与删除元素
class Stack {
    // data在Stack类中直接声明,所以添加至类的实例(this)上,此时this上便有 data属性
    // 声明Stack 实例(this)上的 data 为数组类型,数组内每一项可以为任意数据类型
    // 在class 类中直接声明赋值(=赋值)的属性添加至类的实例上
    // 在类中通过 key : value 声明赋值的属性添加至该 类的原型对象上,即 Stack.prototype上
    // 类的实例可以通过原型链访问到原型对象上的属性
    constructor() {
        this.data = [];
    }
    // 进栈
    enter(a) {
        this.data.push(a);
        return this.data.length;
    }
    // 出栈
    leave() {
        let final = this.data.pop();
        return final;
    }
    //查询某一项
    search(element) {
        let index = this.data.indexOf(element);
        return index;
    }
    // 清空栈
    clear() {
        this.data = [];
    }
    // 返回栈顶元素
    peek() {
        return this.data[this.data.length - 1];
    }
    // 判断栈是否为空
    isEmpty() {
        return this.data.length == 0;
    }
    // 返回栈元素的个数
    size() {
        return this.data.length;
    }
    // 将栈结构的内容以字符串形式返回
    toString() {
        return this.data.join("");
    }
}
// 十进制转为二进制代码
function decimalismTobinary(num) {
    let stack = new Stack();
    while (num != 0) {
        let result = num % 2;
        num = Math.floor(num / 2);
        stack.enter(result);
    }
    return stack.toString().split("").reverse().join("");
}
console.log(decimalismTobinary(10));
// 单向链表
// 删除单链表  
// 单链表插入元素(头 尾  中间)
// 单链表删除元素(头 尾  中间)
// 返回单链表的元素个数
// 定义单链表的节点类
class EleNode {
    // next?：EleNode 表示next的值可以是 EleNode 或者 undefined 类型的值
    // 即当next 的值不为EleNode类型时,我们需要将 next 的值赋值为 undefined
    // 直接声明的属性会挂载到类的实例this上
    constructor(ele = null) {
        this.ele = ele;
        this.next = undefined;
    }
}
// 单向链表
class LinkedList {
    constructor() {
        this.head = new EleNode();
    }
    // 插入节点
    insert(oldNode, newNode) {
        let head = this.head;
        while (head && head.ele !== oldNode.ele) {
            // 类型断言 ,因为进行此操作时 next 值为 undefined 与 EleNode ,都要参与循环操作
            // 所以我们要告诉ts编译器,该语句是可以执行的
            // 即使 head.next值为 undefined时 因为类型断言使ts编译器认为 head.next为 EleNode类型
            // 所以 也会将undefined (head.next的值)赋值给 EleNode类型的 head
            head = head.next;
        }
        // 如果在头节点或者尾节点之后插入
        if (!head.ele || !head.next) {
            head.next = newNode;
        }
        else {
            // 如果在一般节点后插入 ,非头尾节点
            newNode.next = head.next;
            head.next = newNode;
        }
        return this.head;
    }
    // 清空链表
    clear() {
        this.head.next = undefined;
        return true;
    }
    // 查找节点
    searchNode(ele) {
        let head = this.head;
        while (head && head.ele != ele) {
            head = head.next;
        }
        if (!head) {
            // 如果找不到节点
            return undefined;
        }
        else {
            //如果找到节点
            return head;
        }
    }
    // 查找已知节点的上一个节点
    prev(node) {
        let head = this.head;
        while (head && head.next != node) {
            head = head.next;
        }
        if (!head) {
            // 如果找不到上一个节点
            return undefined;
        }
        else {
            // 找到上一个节点时
            return head;
        }
    }
    // 查找已知节点的下一个节点
    next(node) {
        let element = this.searchNode(node.ele);
        if (element) {
            return node.next;
        }
        else {
            return undefined;
        }
    }
    // 删除节点
    deleteNode(node) {
        let element = this.searchNode(node.ele);
        // 删除节点不存在
        if (!element)
            throw new Error("该节点不存在");
        // 如果删除节点为头节点
        if (element && element.ele == null) {
            throw new Error("不能删除头节点");
        }
        // 如果删除节点为尾节点
        if (element && element.next == undefined) {
            // 删除尾节点
            let prev = this.prev(element);
            prev.next = undefined;
        }
        // 删除一般节点，非头尾节点
        if (element && element.ele !== null && element.next !== undefined) {
            let prev = this.prev(element);
            prev.next = element.next;
        }
        return element;
    }
}
// 队列 : 先进先出 在队头删除 在队尾添加
class Queue {
    constructor() {
        this.data = [];
    }
    enter(element) {
        this.data.push(element);
        return this.data.length;
    }
    leave() {
        let element = this.data.shift();
        return element;
    }
    search(element) {
        let index = this.data.indexOf(element);
        return index;
    }
}
// let queue:Queue = new Queue();
// console.log(queue.enter(1));
// console.log(queue.enter(3))
// console.log(queue.search(3))
// console.log(queue.leave())
