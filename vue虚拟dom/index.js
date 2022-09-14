// 虚拟DOM 是一个js对象描述dom节点
/*
h("div",{id:"wrapper",a:1},h("span",{style:{color:"red"}},"hello"),"zf");

{
    type:"div",
    props:{id:"wrapper",a:1},
    children:[
        {type:"span",props:{color:"red"},children:[{type:"",props:"",children:[],text:"hello"}]},
        {type:"",props:"",children:[],text:"zf"}
    ]
}

*/

const h = require("./h");
const render = require("./render")
const path = require("./path")
let vnode = h("div",{id:"wrapper",a:1,key:"xx"},h("span",{style:{color:"red"}},"hello"),"zf");

