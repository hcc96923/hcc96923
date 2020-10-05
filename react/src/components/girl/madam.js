import React, { Component } from 'react';
import PropTypes from 'prop-types';
import madamWoman from '../../img/madam.jpg';

class Madam extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() { 
        return (  
            <>
                <div>
                    <h1>{this.props.name}</h1>
                    <img src={madamWoman} alt="无法显示"></img>
                </div>
                <button onClick={() => this.props.onMoney()}>setMoney</button>
            </>
        );
    }
}

Madam.propTypes = {
    name: PropTypes.string
}

export default Madam;