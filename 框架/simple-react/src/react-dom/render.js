import { createComponent, setComponentProps } from './diff';
import { setAttribute } from './dom';
export function _render(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') { 
        vnode = '';
    }
    if (typeof vnode === 'number') {
        vnode = String(vnode);
    }

    // function Welcome( props ) {
    //     return <h1>Hello, {props.name}</h1>;
    // }
    // tag 是 Welcome
    // 区分组件和原生DOM的工作，是babel-plugin-transform-react-jsx帮我们做的
    if (typeof vnode.tag === 'function') {
        // createComponent方法创建组件实例，并且将函数定义组件扩展为类定义组件进行处理
        const component = createComponent(vnode.tag, vnode.attrs);
        setComponentProps(component, vnode.attrs);
        return component.base;
    }
    // 当vnode为字符串时，渲染结果是一段文本
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        let textNode = document.createTextNode(vnode)
        return textNode;
    }

    const dom = document.createElement(vnode.tag);

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value); // 设置属性
        });
    }
    vnode.children.forEach(child => render(child, dom)); // 递归渲染子节点

    return dom; 
}
/* 
    render的第一个参数接收的是createElement返回的对象
    第二个参数是挂载的目标DOM
    render的作用就是将虚拟DOM渲染成真实的DOM
*/
function render (vnode, container) {
    container.innnerHTML = '';
    // 将渲染结果挂载到真正的DOM上
    return container.appendChild(_render(vnode));
}

export default render