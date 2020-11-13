import React, { useContext } from 'react';
import { ColorContext } from './Color';

function ShowArea() {
    const {color} = useContext(ColorContext);
    return (
        <>
            <h1 style={{color: color}}>Hello ReackHooks</h1>
        </>
    )
}

export default ShowArea;