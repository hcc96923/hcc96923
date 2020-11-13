import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import Teacher from '../components/boy/teacher';
import Young from '../components/boy/people/young';
import Old from '../components/boy/people/old';


export default class Man extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() { 
        return (  
            <Fragment>
                <ul>
                    <li><Link to="/man">Teacher</Link></li>
                    <li><Link to="/man/young">Young</Link></li>
                    <li><Link to="/man/old">Old</Link></li>
                </ul>
                <Route path="/man" component={Teacher}></Route>
                <Route path="/man/young" component={Young}></Route>
                <Route path="/man/old" component={Old}></Route>
            </Fragment>
        );
    }
}
