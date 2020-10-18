import { _render } from './render'
/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @param {HTMLElement} container 容器
 * @returns {HTMLElement} 更新后的DOM
**/


export function renderComponent(component) {
    let base;
    // 调用组件的render函数返回dom对象
    const renderer = component.render();
    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }
    base = _render(renderer);
    

    if ( component.base ) {
        if ( component.componentDidUpdate ) component.componentDidUpdate();
    } else if ( component.componentDidMount ) {
        component.componentDidMount();
    }

    if ( component.base && component.base.parentNode ) {
        component.base.parentNode.replaceChild( base, component.base );
    }

    // component.base保存组件实例最终渲染出来的DOM
    // 反过来base._component保存的是dom对象所对应的组件，这个就是为了把他们关联起来
    component.base = base;
    base._component = component;
}
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