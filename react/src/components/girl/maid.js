import React, { Component } from 'react';
import PropTypes from 'prop-types';
import maidWoman from '../../img/maid.jpg';

class Maid extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    getProps = () => {
        console.log(this.props);
    }
    componentDidMount() {
        this.getProps();
    }
    setHandsome = () => {
        this.props.onHandsome();
    }
    render() { 
        return (  
            <>
                <div>
                    <h1>{this.props.name}</h1>
                    <img src={maidWoman} alt="无法显示"></img>
                </div>
                <button onClick={this.setHandsome}>setHandsome</button>
            </>
        );
    }
}

Maid.propTypes = {
    name: PropTypes.string
}

export default Maid;