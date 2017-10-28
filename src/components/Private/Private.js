import React, { Component } from 'react';
import './Private.css';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from './../../ducks/user';
import { store } from '../../store';


store.dispatch({ type: 'CHANGE_NAME', payload: 'David' })
// store.dispatch({ type: 'CHANGE_NAME', payload: 'Will' })
// store.dispatch({ type: 'CHANGE_NAME', payload: 'Scarlett' })
store.dispatch({ type: 'CHANGE_AGE', payload: 40 })
store.dispatch({ type: 'DEPOSIT', payload: 1000 })
// store.dispatch({ type: 'WITHDRAWAL', payload: 40 })
// store.dispatch({ type: 'WITHDRAWAL', payload: 10 })





class Private extends Component {
constructor(props) {
    super(props);
    this.getInfo=this.getInfo.bind(this);
    this.accountWithdrawal=this.accountWithdrawal.bind(this);
    this.accountDeposit=this.accountDeposit.bind(this);
}

    componentWillMount() {
        this.setState({user:getUserInfo()})
    }
    

    
    getInfo (){
        let temp = store.dispatch(getUserInfo())
        this.setState({
            user: temp
        })
    }
    accountWithdrawal (){
    store.dispatch({type: 'WITHDRAWAL', payload: 20})
    }
    accountDeposit (){
        store.dispatch({type: 'DEPOSIT', payload: 100})
    }
    render() {
        return (
            <div className=''>
                <h1>Community Bank</h1><hr />
                <h4>Account information:</h4>
                { this.props.state.user ? <img alt='profile' className='avatar' src={this.props.state.user.img} /> : null }
                <p>Username: { this.props.state.user ? this.props.state.user.user_name : null }</p>
                <p>Age: { this.props.state.user ? this.props.state.user.age : null }</p>
                <p>Email: { this.props.state.user ? this.props.state.user.email : null }</p>
                <p>ID: { this.props.state.user ? this.props.state.user.auth_id : null }</p>
                <h4>Available balance: { this.props.state.user ? '$' + this.props.state.account : null } </h4>
                <a href='http://localhost:3005/auth/logout'><button>Log out</button></a>
                <button onClick={this.accountWithdrawal}>WITHDRAWAL</button>
                <button onClick={this.accountDeposit}>DEPOSIT</button>
                <button onClick={this.getInfo}>GET INFO</button>
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
         state: state
    }
}

export default connect( mapStateToProps, getUserInfo())(Private);
