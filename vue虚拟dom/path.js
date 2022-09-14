module.exports =  path;
function path (oldVnode,newVnode){
if(oldVnode.type !== newVnode.type){
    //类型不同
    // parentNode 找到父节点
    // replaceChild(newChild,oldVChild),将旧的孩子节点替换为新的孩子节点
    return oldVnode.domElement.parentNode.replaceChild(createDomElementFrom(newVnode),oldVnode.domElement)
    // 老的虚拟节点的父元素替换孩子(将老的孩子节点替换为新的孩子节点)
}
// 类型相同,newNode与oldNode都为文本  文本不同
if(oldVnode.text){
return oldVnode.domElement.textContent = newVnode.text;
// 将元素的文本内容替换为新的虚拟节点的文本内容
}

// 类型相同,并且都是标签
let domElement = newNode.domElement = oldVnode.domElement;
updateProperties(newVnode,old.props)  // 根据最新的虚拟节点更新属性
let oldChildren = oldVnode.children; // 老儿子
let newChildren = newVnode.children; // 新儿子

// 老的有儿子,新的有儿子
// 老的有儿子,新的没儿子
// 老的没儿子,新的有儿子

if(oldChildren.length > 0 && newChildren.length > 0){
    //对比两个儿子
    updateChildren(oldChildren,newChildren);
}else if (oldChildren.length > 0){
    // 表示新的没有儿子
    domElement.innerHTML = "";
}else if(newChildren.length > 0){
    // 表示老的节点无儿子,新的节点有儿子
    for(let i = 0; i < newChildren.length; i++){
        domElement.appendChild(createDomElementFrom(newChildren[i]));
    }
}
}

function isSameVnode(oldVnode,newVnode){
if(oldVnode.key == newVnode.key && oldVnode.type == newVnode.type){
    return true;
}else{
    return false;
}
}
function updateChildren(parent,oldChildren,newChildren){
// diff 核心
// 老节点的起始位置及其对应的起始节点
let oldStartIndex = 0;
let oldStartVnode = oldChildren[oldStartIndex];
// 老节点的结束位置及其对应的结束节点
let oldEndIndex = oldChildren.length - 1;
let oldEndVnode = oldChildren[oldEndIndex]

// 新节点的起始位置及其对应的起始节点
let newStartIndex = 0;
let newStartVnode = newChildren[newStartIndex];
// 新节点的结束位置及其对应的结束节点
let newEndIndex = newChildren.length - 1;
let newEndVnode = newChildren[newEndIndex]

//判断老的孩子与新的孩子,谁先结束就停止循环
while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex){
    if(isSameVnode(oldStartVnode,newStartVnode)){
           path(oldStartVnode,newStartVnode)
           oldStartVnode = oldChildren[++oldStartIndex]
           // 先进行 oldStartIndex += 1 再执行 oldStartVnode = oldChildren[oldStartIndex]
           newStartVnode = newChildren[++newStartIndex];
    }else if(isSameVnode(oldEndVnode,newEndVnode)){
        path(oldEndVnode,newEndVnode)
        oldEndVnode = oldChildren[--oldStartIndex]
        // 先进行 oldStartIndex -= 1 再执行 oldStartVnode = oldChildren[oldEndIndex]
        newEndVnode = newChildren[--newStartIndex];
    }
}

if(newStartIndex <= newEndIndex){
        for(let i = newStartIndex; i <= newEndIndex;i++){
            let beforeElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement
            path.insertBefore(createDomElementFrom(newChildren[i]),beforeElement)
            // insertBefore 当第二个参数为 null时 就会将第一个元素追加到父元素的最后面
            //insertBefore 当第二个参数不为 null时 就会将第一个元素追加到第二个参数代表的元素的前面
        }
}


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

    function render (vnode,container){
        //将虚拟DOM节点转为真实DOM节点并挂载到页面容器上
       let ele =   createDomElementFrom(vnode);
       container.appendChild(ele)
        
    }