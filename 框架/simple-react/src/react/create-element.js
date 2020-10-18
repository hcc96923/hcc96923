/* 
    React.createElement
    jsx片段会被转译成用React.createElement方法包裹的代码
    返回一个对象来保存它的信息
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