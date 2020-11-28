import React, { Component, Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
const List = React.lazy(() => import('./views/Article/list'));
const Detail = React.lazy(() => import('./views/Article/detail'));
const TodoList = React.lazy(() => import('./views/Redux/TodoList'));
const ReactHooks = React.lazy(() => import('./views/reacthooks'));
const Clock = React.lazy(() => import('./views/Clock/index'));


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  };
  render() {
    return (
      <Fragment>
        <Router>
          <ul>
            <li className="link"><Link to="/">List</Link></li>
            <li className="link"><Link to="/redux">Redux</Link></li>
            <li className="link"><Link to="/clock">Clock</Link></li>
            <li className="link"><Link to="/reacthooks">ReactHooks</Link></li>
          </ul>
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/" exact>
                <List></List>
              </Route>

              <Route path="/detail/:id" component={Detail}>
              </Route>

              <Route path="/redux">
                <TodoList></TodoList>
              </Route>

              <Route path="/clock">
                <Clock></Clock>
              </Route>

              <Route path="/reacthooks">
                <ReactHooks></ReactHooks>
              </Route>
            </Suspense>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
