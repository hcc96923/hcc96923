import { enqueueSetState } from './set-state-queue'
;
class Component {
    // 通过继承React.Component定义的组件有自己的私有状态state可以通过this.state获取到
    // 同时也能通过this.props来获取传入的数据
    // 所以在构造函数中，需要初始化state和props
    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }
    // 组件内部的state和渲染相关，state改变时通常会出发渲染，为了让react知道我们改变了state，我们只能通过setState方法修改数据
    setState(stateChange) {
        enqueueSetState( stateChange, this );
    }
}
export default Component;