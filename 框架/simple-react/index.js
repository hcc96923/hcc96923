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
        // console.log( 'update' );
    }

    componentWillMount() {
        // console.log( 'mount' );
    }

    onClick() {
        this.setState( { num: this.state.num + 1 } );
    }

    render() { 
        // transform-react-jsx是将jsx转换为js的babel插件
        // 它有一个pragma项，可以定义jsx转换方法的名称。
        // 首先jsx片段会被转译成用React.createElement方法包裹的代码
        return (  
            <div onClick={ () => this.onClick() }>
                Hello World
                <h1>number: {this.state.num}</h1>
                <button>add</button>
            </div>
        );
    }
}

ReactDOM.render(<Conuter />, document.getElementById('root'));