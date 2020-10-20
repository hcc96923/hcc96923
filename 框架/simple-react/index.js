import React from './src/react';
import ReactDOM from './src/react-dom';

class App extends React.Component {
    render() { 
        return <h1>Hello World</h1>;
    }
}

class Conuter extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            num: 0
        }
    }
    componentWillUpdate() {
        console.log( 'update' );
    }

    componentWillMount() {
        // console.log( 'mount' );
        for ( let i = 0; i < 100; i++ ) {
            this.setState( prevState => {
                console.log( prevState.num );
                return {
                    num: prevState.num + 1
                }
            } );
        }
    }
    componentDidMount() {
        // 执行这段代码会导致这个组件被重新渲染100次，这对性能是一个非常大的负担
        // react会将多个setState的调用合并成一个来执行，这意味着setState的时候state并不会立即执行
        
    }
    // 类组件的render方法以及函数式组件的返回值均为element
    // 虚拟dom是对组件实例或者dom节点的描述
    // 每次组件props或者state变更首先会反映到虚拟dom树，然后最终反应到页面dom节点树的渲染
    // 而且这个纯对象包含两个属性：type:(string|ReactClass)和props:Object
    render() { 
        // transform-react-jsx是将jsx转换为js的babel插件
        // 它有一个pragma项，可以定义jsx转换方法的名称。
        // 首先jsx片段会被转译成用React.createElement方法包裹的代码
        return (  
            <div>
                <h1>{this.state.num}</h1>
            </div>
        );
    }
}

ReactDOM.render(<Conuter />, document.getElementById('root'));