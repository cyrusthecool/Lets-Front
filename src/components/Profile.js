import React, { Component} from 'react'
import axios from 'axios'
import Header from './Header'

const LOGIN_SERVER_URL='https://backend-lets.herokuapp.com/'

class SignUp extends Component {
  constructor() {
    super()
    this.state={

      new_user: {
        email: '',
        password: '',
        password_confirmation: ''
      }
     }
