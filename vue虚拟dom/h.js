
/**
 * 
 * @param {*} type 类型
 * @param {*} props 节点属性
 * @param  {...any} children 将type props后所有的参数合并到children参数中,children为一个数组
 * @returns 
 */

module.exports = function createElement(type,props={},...children){
 // 将AST抽象语法树转为虚拟DOM节点
    let key;
    if(props.key){
     key = props.key;
     delete props.key;
    }
   children =  children.map(child=>{
        if(typeof child == "string"){
            return vnode(undefined,undefined,undefined,undefined,child)
        }else{
            return child
        }
    })
    return vnode(type,key,props,children)
}
function vnode(type,key,props,children,text=undefined){
    return {
        type,
        key,
        props,
        children,
        text
    }
    }