import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                { id: 0, title: '啊大大苏打撒旦飒飒的' },
                { id: 1, title: '阿三大苏打实打实的' },
                { id: 2, title: '现场v从v从v从' },
                { id: 3, title: '曹张新村大师傅地方' },
                { id: 4, title: 'v发嘎嘎哈哈' },
                { id: 5, title: '看见看见好看后面就好好' },
                { id: 6, title: '通过同仁堂共和国好吧' },
                { id: 7, title: '吧v吧v吧v ' },
                { id: 8, title: '法大师傅十分丰富发生的事' },
                { id: 9, title: '法国发表vv不能避免你们' }
            ]
        }
    }
    render() { 
        return (  
            <>
                <h1>{this.props.title}</h1>
                <ul>
                    {
                        this.state.list.map(item => {
                            return (
                                <li  key={item.id}>
                                    <Link to={"/detail/" + item.id}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </>
        );
    }
}

List.propTypes = {
    title: PropTypes.string
}

export default List;