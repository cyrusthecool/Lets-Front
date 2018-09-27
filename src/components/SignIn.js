import React, { Component } from 'react'
import axios from 'axios'
import { history } from '../Routes'
import _ from 'lodash'
import Header from './Header'
import { Link } from 'react-router-dom'

const LOGIN_SERVER_URL = 'https://backend-lets.herokuapp.com/user_token'
const USERS_SERVER_URL = 'https://backend-lets.herokuapp.com/users.json'

// const LOGIN_SERVER_URL = 'http://localhost:3000/user_token'
// const USERS_SERVER_URL = 'http://localhost:3000/users.json'

class SignIn extends Component {
  constructor () {
    super()
    this.state = {
      auth: {
        email: '',
        password: ''
      }
    }
    this._handleEmailInput = this._handleEmailInput.bind(this)
    this._handlePasswordInput = this._handlePasswordInput.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }




_handleEmailInput(e) {
  this.setState({
    auth: { ...this.state.auth, email: e.target.value }
  })

  }

  _handlePasswordInput (e) {
    this.setState({
      auth: { ...this.state.auth, password: e.target.value }
    })
  }

  _handleSubmit (e) {
    e.preventDefault();

  axios.post(LOGIN_SERVER_URL, this.state ).then( (result) => {
    console.log("Response came back:", result);
    localStorage.setItem("jwt", result.data.jwt);
    localStorage.setItem("username", this.state.auth.email);

  })
  .then(() => {
    axios.get(USERS_SERVER_URL).then( result => {
      localStorage.setItem("user_id", _.filter(result.data.users, {email: localStorage.getItem("username")})[0].id )
    })
    })
    .then(() => {
      this.props.history.push('/')}
    ).catch( (errors) => {
    console.log(errors)
  })

  }


  render() {
    return (
      <div >
        <Header />
        <div className="mainSignIn">
          <h1>Sign In</h1>
          <div className="">
        <form onSubmit={this._handleSubmit}>
          <ul>
            <li><label>
            Email:
            <br></br>
            <input onChange={this._handleEmailInput} type='email' name='email' value={this.state.auth.email} autoFocus required></input>
              </label></li>
            <br></br>
              <li><label>
            Password:
            <br></br>
            <input onChange={this._handlePasswordInput} type='password' name='password' value={this.state.auth.password} required></input>
          </label></li>
          <p>{this.state.message}</p>
          <button type='submit' name="create">Log in</button>
          <h5> Don't have an account ?</h5><button type='submit' name="signin"><Link to={`/signup`} className='navlink'>Sign Up</Link></button>
          </ul>
        </form>
        </div>
        </div>
      </div>

    )
  }
}




export default SignIn
