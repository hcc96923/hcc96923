import { GET_LIST, CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './actionTypes';

const defaultState = {
    input: '',
    list: [
        '波多野结衣',
        '上原亚衣',
        '桥本有菜',
    ]
};
// reducer必须是纯函数其结果必须依赖于传入的参数
const reducer = (state=defaultState, action) => {
    switch (action.type) {
        case GET_LIST:
            let listState = JSON.parse(JSON.stringify(state));
            listState.list = action.data;
            return listState;
        case CHANGE_INPUT:
            // state.input = action.value;
            // return state;
            let changeState = JSON.parse(JSON.stringify(state));
            changeState.input = action.value;
            return changeState;
        case ADD_ITEM:
            let addState = JSON.parse(JSON.stringify(state));
            addState.list.push(addState.input);
            addState.input = '';
            return addState;
        case DELETE_ITEM:
            let deleteState = JSON.parse(JSON.stringify(state));
            deleteState.list.splice(action.value, 1);
            return deleteState;
        default:
            break;
    }
    return state;
}

export default reducer;