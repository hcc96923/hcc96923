import React, { Component } from 'react';

export default class Student extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    deleteItem(index) {
        this.props.onToParent(index);
    }
    render() { 
        return (  
            <>
                <ul>
                    {
                        this.props.list.map((item, index) => {
                            return (
                                <li 
                                    key={index} 
                                    onClick={this.deleteItem.bind(this, index)}
                                >{item.name}</li>
                            )
                        })
                    }
                </ul>
            </>
        );
    }
}
