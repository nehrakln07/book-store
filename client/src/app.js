import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/navBar';
import BookList from './components/booklist';

import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="">
            {/* <Route exact path="/" component={ BookList }/> */}
            <BookList />
          </div>
        </div>
      </Router>
    </Provider>
  );
};


export default App;