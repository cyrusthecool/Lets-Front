import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from './images/logo.png';
import { history } from '../Routes'



class Nav extends Component {

  _logOut = () => {
    localStorage.clear()
    history.push({
      pathname: '/',
    })
  }

  forceUpdate = () => {
    this.forceUpdate()
  }


  render () {
    return (
      <div className='navbar'>
        <img src={logo} width="250" height="100" className='logo' />
        <ul className='navlist'>
          <Link to={`/`} className='navlink'>Home</Link>
          <Link to={`/groups`} onClick={this.forceUpdate} className='navlink'>Groups</Link>
          <Link to={`/events`} className='navlink'>Events</Link>
          {localStorage.getItem('jwt') == null ? false : <Link to={`/newgroup`} className='navlink'>New Group</Link>}
          {localStorage.getItem('jwt') == null ? false : <p>{localStorage.getItem('username')}</p>}
          {localStorage.getItem('jwt') == null ? false : <button  className="logout" onClick={this._logOut}>Log Out</button>}
          {localStorage.getItem('jwt') == null ? <Link to={`/signin`} className='navlink'>Sign In</Link> : false}
          {localStorage.getItem('jwt') == null ? <Link to={`/signup`} className='navlink'>Sign Up</Link> : false}
        </ul>
      </div>
    )
  }
}

export default Nav
