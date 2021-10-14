import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoListPage from './containers/TodoListPage';
import NotFoundPage from './containers/NotFoundPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={TodoListPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;