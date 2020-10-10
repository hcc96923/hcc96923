import React, { Component } from 'react';
import PropTypes from 'prop-types';
import oldWoman from '../../img/old.jpg';

class Old extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    setLogin = () => {
        this.props.onLogin();
    }
    render() { 
        return (  
            <>
                <div>
                    <h1>{this.props.name}</h1>
                    <img src={oldWoman} alt="无法显示"></img>
                </div>
                <button onClick={this.setLogin}>setLogin</button>
            </>
        );
    }
}

Old.propTypes = {
    name: PropTypes.string
}

export default Old;