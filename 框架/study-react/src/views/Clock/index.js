import React, { Component } from 'react';

function Children(props) {
    console.log(props);
    return (
        <>
            <div>{props.left}</div>
            <div>{props.center}</div>
            <div>{props.right}</div>
            <div>{props.children}</div>
        </>
    )
};
class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    render() { 
        return (  
            <>
                <Children
                    left={<h1>Left</h1>}
                    center={<h1>Center</h1>}
                    right={<h1>999</h1>}>
                        999
                </Children>
            </>
        );
    }
};
export default Clock;