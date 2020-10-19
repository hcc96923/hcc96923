/* 
    React.createElement
    jsx片段会被转译成用React.createElement方法包裹的代码
    返回一个对象来保存它的信息
    tag 标签名
    attrs 一个对象包含了所有的属性
    ...children 所有的子节点
*/
function createElement (tag, attrs, ...children) {

    attrs = attrs || {};

    return {
        tag,
        attrs,
        children
    }
}

export default createElement;