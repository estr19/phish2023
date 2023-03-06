import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Main from './Main';
import SongInfo from './SongInfo';

function App() {
  return (
    <div>
      <Router>
        <nav className='top'>
          <Link to='/' className='link' >Home</Link>
          <Link to='/search' className='link' >Search</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/search' element={<SongInfo />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
