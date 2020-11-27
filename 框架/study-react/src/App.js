import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import List from './views/Article/list';
import Detail from './views/Article/detail';
import TodoList from './views/Redux/TodoList';
import ReactHooks from './views/reacthooks';
import Clock from './views/Clock/index';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  };
  handleSetNumber = () => {
    this.setState({ number: this.state.number+1 });
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
          <h1>{this.state.number}</h1>
          <button onClick={this.handleSetNumber}>Add</button>
          <Switch>
            <Route path="/" exact>
              <List></List>
            </Route>

            <Route path="/detail/:id" component={Detail}>
            </Route>

            <Route path="/redux">
              <TodoList></TodoList>
            </Route>

            <Route path="/clock">
              <Clock number={this.state.number}></Clock>
            </Route>

            <Route path="/reacthooks">
              <ReactHooks></ReactHooks>
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
