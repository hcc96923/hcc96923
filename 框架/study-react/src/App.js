import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Person from './views/person';
import Detail from './components/article/detail';
import Redux from './views/redux';
import ReactHooks from './views/reacthooks';
import NotFound from './components/NotFound';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Fragment>
        <Router>
          <ul>
            <li className="link"><Link to="/">Person</Link></li>
            <li className="link"><Link to="/redux">Redux</Link></li>
            <li className="link"><Link to="/reacthooks">ReactHooks</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact>
              <Person></Person>
            </Route>

            <Route path="/detail/:id" component={Detail}>
            </Route>

            <Route path="/redux">
              <Redux></Redux>
            </Route>

            <Route path="/reacthooks">
              <ReactHooks></ReactHooks>
            </Route>

            <Route>
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
