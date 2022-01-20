import React from 'react';
import Users from '../../hooks/Users';

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
