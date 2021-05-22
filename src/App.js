import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectsList from './pages/ProjectsList';
import ProjectDetail from './pages/ProjectDetail';

import './App.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/projects" component={ProjectsList} />
      <Route exact path="/projects/:id" component={ProjectDetail} />
    </Switch>
  );
}

export default App;
