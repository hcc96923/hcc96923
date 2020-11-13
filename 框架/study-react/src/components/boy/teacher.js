import React, { Component } from 'react';
import Student from './student';

export default class Teacher extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            input: '',
            stuList: [
                { name: '苍井空' },
                { name: '波多野结衣' },
                { name: '上原亚衣' },
                { name: '吉泽明步' },
                { name: '小野寺丽莎' },
                { name: '桥本有菜' },
                { name: '三上悠亚' },
                { name: '橘梨纱' },
                { name: '永赖唯' },
                { name: '水仆樱' }
            ]
        }
    }
    inputChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }
    addStudent = () => {
        let list = this.state.stuList;
        list.push({ name: this.state.input });

        this.setState({
            stuList: list
        });
    }
    deleteStudent = (index) => {
        let state =  this.state.stuList.filter((item, i) => {
            return index !== i;
        });
        this.setState({
            stuList: state
        });
    }
    render() { 
        return (  
            <>
                <input value={this.state.input} onChange={this.inputChange}></input>
                <button onClick={this.addStudent}>添加</button>
                <Student 
                    list={this.state.stuList} 
                    onToParent={this.deleteStudent}
                >
                </Student>
            </>
        );
    }
}
