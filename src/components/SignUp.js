import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import _ from 'lodash'

const SERVER_URL = 'https://backend-lets.herokuapp.com/'
const USER_SERVER_URL = 'https://backend-lets.herokuapp.com/users'

// const SERVER_URL = 'http://localhost:3000/'
// const USER_SERVER_URL = 'http://localhost:3000/users.json'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      form_disabled: false,
      message: "Email :",
      users: {},
      user: {
        email: '',
        password: '',
        password_confirmation: ''
      }
    }

    this._handleEmailInput = this._handleEmailInput.bind(this)
    this._handlePasswordInput = this._handlePasswordInput.bind(this)
    this._handlePasswordConfirm = this._handlePasswordConfirm.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)

    const fetchUsers = () => {
      axios.get(SERVER_URL + 'users.json').then(result => {
        console.log(result);
        this.setState({ users: result.data.users })
      })
    }

    fetchUsers();
  }





  _handleEmailInput(e) {
    if (_.filter(this.state.users, { email: e.target.value }).length === 0) {
      this.setState({
        user: { ...this.state.user, email: e.target.value },
        message: "Email :",
        form_disabled: false
      })
    } else {
      this.setState({
        message: "Email already registered",
        form_disabled: true
      })
    }
  }


  _handlePasswordInput(e) {
    this.setState({
      user: { ...this.state.user, password: e.target.value }
    })
  }

  _handlePasswordConfirm(e) {
    this.setState({
      user: { ...this.state.user, password_confirmation: e.target.value }
    })
  }


  _handleSubmit(e) {
    e.preventDefault();
    axios.post(USER_SERVER_URL, {user: this.state.user}).then((result) => {
      console.log("Response came back:", result);

    }).then(() => {
      this.props.history.push('/signin')}
    ).catch((errors) => {
      console.log("Errors came back:", errors);
    })

  }

  render() {
    return (
      <div>
        <Header />
        <div className="mainSignIn">
          <h1>Sign Up</h1>
          <div >
        <form onSubmit={this._handleSubmit}>
          <ul>
            <li><label>
              <br></br>

            {this.state.message}
            <br></br>
            <input onChange={this._handleEmailInput} type="email" name="email" value={this.state.user.email} autoFocus required></input>
          </label></li>

            <li><label>

            Password:<br></br>
             <input onChange={this._handlePasswordInput} type="password" name="password" value={this.state.user.password} required></input>
          </label></li>
          <br></br>

          <li><label>
            Password Confirmation:
            <br></br>
             <input onChange={this._handlePasswordConfirm} type="password" name="password_confirmation" value={this.state.user.password_confirmation} required></input>
          </label></li>
          <button type="submit" name="signup" disabled={this.state.form_disabled}>Sign Up</button>
          </ul>
        </form>
        </div>
      </div>
    </div>
    )
  }

}

export default SignUp
