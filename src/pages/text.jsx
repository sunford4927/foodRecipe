import React from 'react';
import { useSelector } from 'react-redux';

const Text = () => {
    const count = useSelector(state => state.count

        );
    const value = useSelector(state => state)
    console.log(value);
    return (
        
        <h1>Counter: {count}</h1>
        
    );
};

export default Text;