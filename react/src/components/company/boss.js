import React, { useState, useEffect } from 'react';
import Staff from './staff';
import { Button } from 'antd';
import Senior from './senior';

function Boss() {
    const [count, setCount] = useState(0);
    const [money, setMoney] = useState(0);

    useEffect(()=> {
        console.log('Boss Press The Staff' + count + 'Times');
    }, [count]);
    useEffect(() => {
        console.log('Staff get Money From Boss' + money + 'Times');
    });
    function Decrease(val) {
        setCount(count+val)
    }
    return (
        <>
            <Staff count={count} money={money} onDecrease={Decrease}></Staff>
            <Button type="primary" onClick={()=> setCount(count+1)}>Press</Button>
            <Button type="primary" onClick={()=> setMoney(money+1)}>Money</Button>

            <Senior></Senior>
        </>
    )
}

export default Boss;