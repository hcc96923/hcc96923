import React from 'react';
import Boss from '../components/company/boss';

import Color from '../components/reducer/Color';
import ShowArea from '../components/reducer/ShowArea';
import Buttons from '../components/reducer/Buttons';

function ReactHooks() {
    return (
        <>
            <Boss></Boss>
            <Color>
                <ShowArea></ShowArea>
                <Buttons></Buttons>
            </Color>
        </>
    )
}

export default ReactHooks;