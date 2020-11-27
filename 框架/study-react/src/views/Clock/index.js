import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            count: 0,
            date: new Date()
        };
    };
    tick() {
        console.log(this.state.count);
        console.log(this.props.number);
        this.setState({
            sum: this.state.count + this.props.number
        });
    };
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps);
    //     console.log(nextState);
    //     return true;
    // }
    componentDidMount() {
        const foos = () => ({
            name: 'hcc'
        })
        console.log(foos());
        console.log(this.props.number);
        this.timerID = setInterval(() => this.tick(), 1000);
    };
    componentWillUnmount() {
        clearInterval(this.timerID);
    };
    render() { 
        return (  
            <>
                <h1>{this.state.sum}</h1>
                {this.state.date.toLocaleTimeString()}
            </>
        );
    }
};
export default Clock;