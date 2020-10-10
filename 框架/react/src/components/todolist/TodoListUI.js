import React from 'react';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css';

const TodoListUI = (props) => {
    return (  
        <>
            <div style={{marginBottom: "10px"}}>
                <Input placeholder="Please Write Something" value={props.input} onChange={props.changeInput} style={{width: "300px", marginRight: "10px"}} />
                <Button type="primary" onClick={props.addItem}>Add</Button>
            </div>
            <div style={{width: '300px'}}>
                <List
                    bordered
                    dataSource={props.list}
                    renderItem={
                        (item,index)=>(
                            <List.Item key={index} onClick={()=>props.deleteItem(index)}>
                                {item}
                            </List.Item>)}
                ></List>
            </div>
        </>
    );
}

 
export default TodoListUI;