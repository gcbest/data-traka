import React from 'react';
import './App.css';
import CpuUsage from './components/CpuUsage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Stocks from './components/Stocks';
import Navbar from './components/Navbar';



function App() {


  return (
    <Router>
      <Navbar/>
      <Switch>
          <Route path="/cpu-usage">
            <CpuUsage/>
          </Route>
          <Route path="/">
            <Stocks />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
