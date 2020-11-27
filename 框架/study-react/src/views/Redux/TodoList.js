import React, { Component } from 'react';
import { getTodoList, changeInputAction, addItemAction, deleteItemAction } from '../../store/actionCreators';
import store from '../../store/index';
import TodoListUI from './TodoListUI';

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        store.subscribe(this.storeChange)
    }
    componentDidMount() {
        this.getList();
    }
    storeChange = () => {
        this.setState(store.getState());
    }
    getList = () => {
        const action = getTodoList();
        store.dispatch(action);
    }
    changeInput = (e) => {
        const action = changeInputAction(e.target.value);
        store.dispatch(action);
    }
    addItem = () => {
        const action = addItemAction();
        store.dispatch(action);
    }
    deleteItem = (index) => {
        const action = deleteItemAction(index);
        store.dispatch(action);
    }
    render() { 
        return (  
            <>
                <TodoListUI
                    input={this.state.input}
                    list={this.state.list}
                    changeInput={this.changeInput}
                    addItem={this.addItem}
                    deleteItem={this.deleteItem}>
                </TodoListUI>
            </>
        );
    }
};
export default TodoList;