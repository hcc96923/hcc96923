import { Componet } from '../react'
import { setAttribute } from './dom';
import {_render} from './render'


/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @param {HTMLElement} container 容器
 * @returns {HTMLElement} 更新后的DOM
**/
// 对比虚拟DOM和真是DOM最后返回更新后的DOM
// diff的初衷：每次更新都重新渲染整个应用或者整个组件，DOM操作消耗性能很严重
// 为了减少DOM更新带来的性能消耗，找到渲染前后真正变化的部分，只更新这一部分DOM

export function diff(dom, vnode, container) {
    const ret = diffNode( dom, vnode );

    if ( container && ret.parentNode !== container ) {
        container.appendChild( ret );
    }

    return ret;
}
/* 
    diffNode
    对比节点自身
*/
function diffNode(dom, vnode) {
    // 从上到下，从左往右逐个处理每个dom节点（如果是修改的话）和vnode
    let out = dom;
    if ( vnode === undefined || vnode === null || typeof vnode === 'boolean' ) vnode = '';

    if ( typeof vnode === 'number' ) vnode = String( vnode );

    // diff text node
    if (typeof vnode === "string") {
        // 当前DOM节点是文本节点，直接更新内容
        // nodeType: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
        if (dom && dom.nodeType === 3) {
            if (dom.textContent !== vnode) {
                dom.textContent = vnode;
            }
        // 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的。新建的文本节点把原来的节点的位置占用了
        } else {
            out = document.createTextNode(vnode);
            if (dom && dom.parentNode) {
                dom.parentNode.replaceChild(out, dom);
            }
        }
        // 文本节点非常简单没有属性，没有子元素
        return out;
    }

    // diff组件
    if (typeof vnode.tag === 'function') {
        return diffComponent(dom, vnode);
    }
    // 情况一：如果真实DOM不存在，表示此节点是新增的，或者新旧两个节点的类型不一样，
    // 那么就新建一个DOM元素，并将原来的子节点（如果有的话）移动到新建的DOM节点下。
    if (!dom || !isSameNodeType( dom, vnode )) {
        out = document.createElement(vnode.tag);
        
        // 不是同一类型的dom
        if (dom) {
            // 将原来的子节点移到新节点下
            [...dom.childNodes].map(out.appendChild);
            if (dom.parentNode) {
                // 移除掉原来的DOM对象
                dom.parentNode.replaceChild(out, dom);
            }
        }
    }


    // 情况二：如果真实DOM存在，并且和虚拟DOM是同一类型的，那我们暂时不需要做别的，
    // 只需要等待后面对比属性和对比子节点。
    if ( vnode.children && vnode.children.length > 0 || ( out.childNodes && out.childNodes.length > 0 ) ) {
        diffChildren( out, vnode.children );
    }

    diffAttributes( out, vnode );

    return out;
}
/* 
    diffChildren
    对比子节点
*/
function diffChildren(dom, vchildren) {
    // 对比子节点时，子节点是一个数组，它们可能改变了顺序，数量。很难确定要和虚拟DOM对比的是哪一个
    // 这里就要为每一个子节点设一个key，重新渲染时对比key值相同的节点
    const domChildren = dom.childNodes;
    const children = [];

    const keyed = {};

    // 划分节点：将有key的节点和没有key的节点分开
    if (domChildren.length > 0) {
        for (let index = 0; index < domChildren.length; index++) {
            const child = domChildren[index];
            const key = child.key;
            if (key) {
                // 有key的
                keyed[key] = child;
            } else {
                // 没有key的
                children.push(child);
            }
        }
    }

    // 虚拟DOM的children
    if (vchildren && vchildren.length > 0) {
        let min = 0;
        let childrenLen = children.length;

        for (let index = 0; index < vchildren.length; index++) {
            const vchild = vchildren[index];
            const key = vchild.key;
            let child;

            // 如果有key的话，在当前dom的子节点有key的对象中也找得到则更新子节点的值
            if (key) {
                if (keyed[key]) {
                    child = keyed[key];
                    keyed[key] = undefined;
                }
            } else if (min < childrenLen) { // 子节点存在的话
                for (let index = min; index < childrenLen; index++) { // 虚拟节点没有key的节点数小于当前dom没有key的节点数
                    let c = children[index]; // 当前没有key的dom
                    if (c && isSameNodeType( c, vchild )) { // 当前没有key的dom是否存在，可能被删除了
                        child = c;
                        children[index] = undefined;
                        if (index === childrenLen -1 ) {
                            childrenLen--;
                        }
                        if (index === min) {
                            min++;
                        }
                        break;
                    }
                }
            }

            // 对比
            child = diff(child, vchild);

            // 更新DOM
            const f = domChildren[index];
            if (child && child !== dom && child !== f) {
                // 如果更新前的对应位置为空，说明此节点时新增的
                if (!f) {
                    dom.appendChild(child);
                // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
                } else if (child === f.nextSibling) {
                    removeNode(f);
                // 将更新后的节点移动到正确的位置
                } else {
                    // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
                    dom.insertBefore(child, f);
                }
            }
        }
    }
}
/* 
    diffComponent
    对比组件
*/
function diffComponent(dom, vnode) {
    let c = dom && dom._component;
    let oldDom = dom;

    // 如果组件类型没有变化则重新set props
    if (c && c.constructor === vnode.tag) {
        setComponentProps(c, vnode.attrs);
        dom = c.base;
        // 如果组件类型变化，则移除掉原来组件，并渲染新的组件
    } else {
        if (c) {
            unmountComponent(c);
            oldDom = null;
        }

        c = createComponent(vnode.tag, vnode.attrs);

        setComponentProps(c, vnode.attrs);
        dom = c.base;

        if (oldDom && dom !== oldDom) {
            oldDom._component = null;
            removeNode(oldDom);
        }
    }
    return dom;
}
/* 
    diffAttributes
    对比节点属性
*/
function diffAttributes( dom, vnode ) {
    // diff算法不仅要找出节点类型的变化，还要找出节点的属性以及事件监听的变化
    const old = {}; // 当前DOM的属性
    const attrs = vnode.attrs; // 虚拟DOM的属性
    // 获取当前DOM节点的属性
    for (let index = 0; index < dom.attributes.length; index++) {
        const attr = dom.attributes[index];
        old[attr.name] = attr.value;
    }

    // 如果原来的属性不在新属性当中，则将其移除掉
    for (let name in old) {
        if (!(name in attrs)) {
            setAttribute(dom, name, undefined);
        }
    }

    // 更新当前dom的属性值
    for (let name in attrs) {
        if (old[name] !== attrs[name]) {
            setAttribute(dom, name, attrs[name]);
        }
    }
}
/* 
    isSameNodeType
    是否是同一类型的node
*/
function isSameNodeType( dom, vnode ) {
    if ( typeof vnode === 'string' || typeof vnode === 'number' ) {
        return dom.nodeType === 3;
    }

    if ( typeof vnode.tag === 'string' ) {
        return dom.nodeName.toLowerCase() === vnode.tag.toLowerCase();
    }

    return dom && dom._component && dom._component.constructor === vnode.tag;
}
/* 
    renderComponent
    渲染组件
*/
export function renderComponent(component) {
    let base;
    // 调用组件的render函数返回dom对象
    const renderer = component.render();
    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }
    // base = _render(renderer);
    base = diff(component.base, renderer);
    

    if ( component.base ) {
        if ( component.componentDidUpdate ) component.componentDidUpdate();
    } else if ( component.componentDidMount ) {
        component.componentDidMount();
    }

    // if ( component.base && component.base.parentNode ) {
    //     component.base.parentNode.replaceChild( base, component.base );
    // }

    // component.base保存组件实例最终渲染出来的DOM
    // 反过来base._component保存的是dom对象所对应的组件，这个就是为了把他们关联起来
    component.base = base;
    base._component = component;
}
/* 
    setComponentProps
    设置组件属性
*/
export function setComponentProps(component, props) {
    if (!component.base) {
        if (component.componentWillMount) {
            component.componentWillMount();
        } else if (component.compoentWillReceiveProps) {
            component.compoentWillReceiveProps();
        }

        component.props = props;
        // renderComponent方法用来渲染组件，setState方法会直接调用这个方法进行重新渲染
        // 在这个方法里可以实现componentWillUpdate, componentDidUpdate, componentDidMount
        renderComponent(component);
    }
}
/* 
    createComponent
    创建组件实例
*/
export function createComponent(component, props) {
    let inst;
    // 如果是类定义组件，则直接返回实例
    if (component.prototype && component.prototype.render) {
        inst = new component(props);
        // 如果是函数定义组件，则将其扩展为类定义组件
    } else {
        inst = new Component(props);
        inst.constructor = component;
        inst.render = function () {
            return this.constructor(props);
        }
    }
    return inst;
}
function unmountComponent( component ) {
    if ( component.componentWillUnmount ) component.componentWillUnmount();
    removeNode( component.base);
}