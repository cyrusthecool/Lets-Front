import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Footer from './Footer'
import helpers from './helpers'
import './css/group.css'

const GROUP_SERVER_URL = 'https://backend-lets.herokuapp.com/groups/'
const ROLES_SERVER_URL = 'https://backend-lets.herokuapp.com/roles.json'

class Api extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: [],
      events: [],
      interests: [],
      user_id: '',
      group_id: '',
      roles_admin: '',
      roles: [],
      admin: false,
      current_user_id: localStorage.getItem('user_id'),
      joined: false
    }
    axios.defaults.headers.common = { "Authorization": 'Bearer ' + localStorage.getItem('jwt') }

    const fetchGroup = () => {
      axios.get(GROUP_SERVER_URL + this.props.id + '.json').then((results) => {
        console.log(localStorage.getItem('user_id'))
        this.setState({
          group: results.data,
          events: results.data.events,
          interests: results.data.interests,
          roles_admin: results.data.roles[0].user_id,
          user_id: localStorage.getItem('user_id'),
          admin: results.data.roles[0].admin,
          roles: results.data.roles,
          adminName: results.data.users[0].name != null ? results.data.users[0].name : results.data.users[0].email,
          numUsers: this.getUniqueValuesOfKey(results.data.users, 'email').length
        })
        checkIfJoined()
      })
    }
    fetchGroup()

    const checkIfJoined = () => {
      _.some(this.state.roles, (r) => { return r.user_id == this.state.current_user_id }) == true ? this.setState({ joined: true }) : false
    }
  }

  _join = (event) => {
    axios.post(ROLES_SERVER_URL, { user_id: this.state.current_user_id, group_id: this.state.group.id, admin: false }).then((results) => {
      this.setState({ joined: true })
    })

  }

  getUniqueValuesOfKey = (array, key) =>{
    return array.reduce(function(carry, item){
      if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
      return carry;
    }, []);
  }

  render() {
    console.log(this.state.group)
    const { group, events, interests, roles_admin, user_id, admin, adminName, numUsers } = this.state
    return (
      <div >
        <div className='groupcontainer'>
          <div className='groupcontainermaincontent'>
            <div className='groupcontainermaincontentimage'>
              <img src={group.image} alt='Logo' className='groupimage' />
            </div>
            <div className='groupcontainermaincontenttext'>
              <h2 className='groupname'>{group.name}</h2>
              <h2 className='groupCreator'>Created By: {adminName}</h2>
              <h2 className='groupMembers'>Members: {numUsers}</h2>

              {user_id == roles_admin && admin == true  ? <h2 className='groupadmin'>Admin <Link to={`/groups/${this.props.id}/edit`}>Edit</Link><Link to={{ pathname: '/newevent', state: { group_id: group.id } }}>New Event</Link></h2> : (this.state.joined == true  ? <h3>✓ Following</h3> : (localStorage.getItem('user_id') == null ? false : <button className='joinbutton' onClick={this._join}>Join</button>))}
              <p className='groupdescription'>{group.description}</p>
              <h4 className='grouplocation'>Location: {group.location}</h4>
              <h4 className='groupnickname'>For: {group.nickname}'s</h4>
            </div>
          </div>
          <h4 className='groupevents'>Upcoming Events: {events.map((x) =>
            <div className='groupeventindividual'>
              <Link to={`/events/${x.id}`} className='groupeventindividualname'>{x.name}</Link>
              <p className='groupeventindividualdate'>{helpers.convertdate(x.date)}</p>
              <p className='groupeventindividuallocation'>{x.location}</p>
              <p className='groupeventindividualdescription'>{x.description}</p>
            </div>
          )}
          </h4>
          <h4 className='groupinterests'> {interests.map((x) =>
            <li>
              <Link to={{ pathname: '/groups', search: `?filterBy=${x.name}` }}>{x.name}</Link>
            </li>
          )}
          </h4>
        </div>
      </div>
    )
  }
}

class Group extends Component {
  render() {
    return (
      <div >
        <Header />
        <Api id={this.props.match.params.id} />
        <Footer />
      </div>
    )
  }
}

export default Group
