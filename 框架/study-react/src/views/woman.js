import React, { Component, Fragment } from 'react';
import Maid from '../components/girl/maid';
import Madam from '../components/girl/madam';
import Old from '../components/girl/old';
import { Redirect } from 'react-router-dom';

export default class Woman extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true,
            isMoney: true,
            isHandsome: true
        }
    }
    setLogin = () => {
        this.setState({
            isLogin: !this.state.isLogin
        });
    }
    setMoney = () => {
        this.setState({
            isMoney: !this.state.isMoney
        })
    }
    setHandsome = () => {
        this.setState({
            isHandsome: !this.state.isHandsome
        })
    }
    render() { 
        return (  
            <Fragment>
                <h1>Welcome to choose a woman</h1>
                {
                    this.state.isLogin ? 
                    (this.state.isMoney ? 
                        (this.state.isHandsome ? <Maid name="萝莉" state={this.state} onHandsome={this.setHandsome}/> : <Madam name="妇女" onMoney={this.setMoney} />) : 
                        <Old name="true" onLogin={this.setLogin}/>
                    ) : 
                    <Redirect to={{
                        pathname: "/",
                        state: { id: 23 }
                    }} />
                }
            </Fragment>
        );
    }
}
