import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import "./App.css"

function App() {
  return (
    <div className='page'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );

}



export default App;

