import userService from '../services/userService.js'
import React from 'react';
import '../css/Login.css';
export default class Signup extends React.Component {
    state = {
        user: {
            name: '',
            password: ''
        }
    }

    onSignup = () => {

        this.props.history.push('/')
    }
    handleInput = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => {
            return {
                user: {
                    ...prevState.user,
                    [field]: value
                }
            }
        })
    }



    render() {
        const { user } = this.state
        return (
            <section className="login-container  color-change-2x flex column align-center j-center">
                <h2>Please signup</h2>
                <div className="login-form flex column space-between align-center">
                    <input value={user.name} onChange={this.handleInput} type="text" name="name" placeholder="Enter Your username" autoComplete="off" required />
                    <input value={user.password} onChange={this.handleInput} type="password" name="password" placeholder="Enter Your password" autoComplete="off" required />
                    <button onClick={this.onSignup}>Signup</button>
                </div>

            </section>
        )
    }
}