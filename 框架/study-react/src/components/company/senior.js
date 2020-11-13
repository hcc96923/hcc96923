import React, { useReducer } from 'react';
import { Button } from 'antd';

function Senior() {
    const [count, dispatch] = useReducer((state, action)=> {
        switch (action) {
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default:
                return state;
        }
    }, 0);
    return(
        <>
            <h1>{count}</h1>
            <Button type="primary" onClick={()=>dispatch('add')}>Add</Button>
            <Button type="primary" onClick={()=>dispatch('sub')}>Sub</Button>
        </>
    )
}

export default Senior;