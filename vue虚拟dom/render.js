/**
 * 
 * @param {*} vnode 为用户传入的虚拟节点
 * @param {*} container 为页面容器
 */
module.exports = function render (vnode,container){
    //将虚拟DOM节点转为真实DOM节点并挂载到页面容器上
   let ele =   createDomElementFrom(vnode);
   container.appendChild(ele)
    
}
function createDomElementFrom(vnode){
    //将虚拟DOM节点转为真实DOM节点

  let {type,key,props,children,text} = vnode;
  if(type){
    // 传递了类型,说明是一个标签
    vnode.domElement = document.createElement(type);
    updateProperties(vnode);
    //children存放的也是一个个虚拟节点
    //递归渲染子的虚拟节点
    children.forEach(child=>render(child,vnode.domElement))
  }else{
    // 没有传递类型(类型为undefined),说明是一个文本
    vnode.domElement = document.createTextNode(text); // 建立虚拟节点与真实元素的关系,后面可以用来更新真实DOM元素
  }
  return vnode.domElement;

}

// 后续比对的时候,会根据老的属性和新的属性去更新节点
function updateProperties(newVnode,oldProps={}){
//根据当前虚拟节点的属性去更新真实的DOM元素
// 获取真实dom元素与虚拟节点的属性
let {props:newProps,domElement} = newVnode
// 如果老的props里面有 ,新的props没有 将老的props中的属性移除
for(let propName in oldProps){
    if(!newProps[propName]){
       Reflect.defineProperty(domElement,propName)
    }
}

let newStyleObj = newProps.style || {};
let oldStyleObj = oldProps.style || {};

for(let propName in oldStyleObj){
    if(!newStyleObj[propName]){
       Reflect.set(newStyleObj,propName,"")
       //老dom元素上更新之后,没有某个样式需要删除
       //当 style中的样式值为 "" 时,该样式会消失
    }
}


//如果老的props里面没有,新的props里面有
for(let propName in newProps){
    if(propName == "style"){
        let styleObj = newProps.style;
        for(let s in styleObj){
            domElement.style[s] = styleObj[s];
        }
    }else{
    if(!oldProps[propName]){
        Reflect.set(domElement,propName,newProps[propName])
     }
}
}

}