import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/navbar.component';
import ExcerciseList from './components/excercise_list.component';
import CreateExcercise from './components/create_excercise.component';
import EditExcercise from './components/edit_excercise.component';
import CreateUser from './components/create_user.component';

function App() {
  return (
    <Router>
      <NavBar />
      <br />
      <Route path="/" exact component={ExcerciseList} />
      <Route path="/edit/:id"  component={EditExcercise} />
      <Route path="/create" component={CreateExcercise} />
      <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
