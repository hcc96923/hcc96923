import axios from 'axios';
import { GET_LIST, CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './actionTypes';

export const getListAction  = (data)=>({
    type: GET_LIST,
    data
})

export const getTodoList = () => {
    return (dispatch)=>{
        axios.get('http://localhost:8080')
             .then(response => {
                 const action = getListAction(response.data);
                 dispatch(action);
             })
             .catch(error => {
                 console.log(error);
             });
    }
}

export const changeInputAction = (value)=>({
    type: CHANGE_INPUT,
    value
});

export const addItemAction = ()=>({
    type: ADD_ITEM
});

export const deleteItemAction = (value)=>({
    type: DELETE_ITEM,
    value
});