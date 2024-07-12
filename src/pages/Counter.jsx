
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/actions/index';
import './Counter.css';
import Text from './text';
import Text2 from './Text2';

function Counter() {
    const [num, setNum] =  useState(0)
  const dispatch = useDispatch();
    console.log(1)
  return (
    <div>
      <header >
        <Text2 num={num}/>
        <Text/>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => setNum(num+1)}>+</button>
        <button onClick={() => setNum(num-1)}>-</button>
      </header>
    </div>
  );
}

export default Counter;