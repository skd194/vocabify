import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Users from './hooks/Users';

function App() {
  return (
    <div>
      <button className='button'>Hello World</button>
      <input
        className='input is-primary'
        type='text'
        placeholder='Primary input'
      ></input>
      <Users></Users>
    </div>
  );
}

export default App;
