import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Landing from './components/layout/Landing.jsx';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component = {Landing} />
      </Fragment>
    </Router>
  );
}

export default App;
