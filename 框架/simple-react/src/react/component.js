import { renderComponent } from '../react-dom/diff';
class Component {
    // 通过继承React.Component定义的组件有自己的私有状态state可以通过this.state获取到
    // 同时也能通过this.props来获取传入的数据
    // 所以在构造函数中，需要初始化state和props
    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }
    // 组件内部的state和渲染相关，state改变时通常会出发渲染，为了让react
    // 直到我们改变了state，我们只能通过setState方法修改数据
    setState(stateChange) {
        // 将修改合并到state
        Object.assign(this.state, stateChange);
        // 在每次更新state后，需要调用renderComponent方法重新渲染组件
        renderComponent(this);
    }
}
export default Component;