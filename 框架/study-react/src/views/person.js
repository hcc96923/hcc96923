import React, { Component, Fragment } from 'react';
import List from '../components/article/list';

class Person extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (  
            <Fragment>
                <List title="文章列表"></List>
            </Fragment>
        );
    }
};
export default Person;