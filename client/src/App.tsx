// eslint-disable-next-line no-use-before-define
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Stocks from './pages/Stocks';
import Navbar from './components/Navbar';

function App(): React.ReactElement {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/">
          <Stocks />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
