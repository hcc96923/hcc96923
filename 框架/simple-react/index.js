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