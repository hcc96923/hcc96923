import React, { useContext } from 'react';
import { Button } from 'antd';
import { ColorContext, UPDATE_COLOR } from './Color';

function Buttons() {
    const {dispatch} = useContext(ColorContext);
    return (
        <>
            <Button type="primary" onClick={()=>dispatch({type: UPDATE_COLOR, value: 'yellow'})}>Yellow</Button>
            <Button type="primary" onClick={()=>dispatch({type: UPDATE_COLOR, value: 'green'})}>Green</Button>
        </>
    )
}

export default Buttons;