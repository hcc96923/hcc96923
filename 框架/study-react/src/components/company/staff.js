import React, { useMemo } from 'react';
import { Button } from 'antd';

function Staff(props) {
    function changeMoney(money) {
        console.log('You Have Get' + money + 'Yuan');
        return money + 'Yuan';
    }
    // count的改变也会导致money的重新渲染
    // const Money = changeMoney();
    // useMemo的第二个参数匹配成功才会执行
    const Money = useMemo(()=> changeMoney(props.money), [props.money]);
    return(
        <>
            <h1>{`The Staff by Boss Pressed ${props.count} Times`}</h1>
            <h1>{`The Staff get Money From Boss ${Money} Yuan`}</h1>
            <Button type="success" onClick={()=>props.onDecrease(-1)}>unPress</Button>
        </>
    )
}

export default Staff;