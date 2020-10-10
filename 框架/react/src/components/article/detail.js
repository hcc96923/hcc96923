import React, { Component } from 'react';

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() { 
        return (  
            <>
                <h1>{this.props.match.params.id}</h1>
            </>
        );
    }
}
export default Detail;