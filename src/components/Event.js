import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import { Link } from 'react-router-dom';

const SERVER_URL = 'https://backend-lets.herokuapp.com/'

class Event extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current_user: localStorage.getItem("username"),
      event: {},
      event_id: this.props.match.params.id,
      users: [],
      group: {}
    }

    const fetchEvent = () => {
      let url = SERVER_URL + 'events/' + this.state.event_id + '.json';
      axios.get(url).then(event => {
        console.log(event.data)
        this.setState({
          event: event.data,
          users: event.data.users,
          group: event.data.group
        })
        console.log(this.state.group)
      }).catch((errors) => {
        console.log(errors)
      })
    }
    fetchEvent()
  }

  render () {
    const { event, group, users } = this.state
    return (
      <div >
        <Header />
        <div className='eventcontainer'>
          <div>
            <img src={event.image} alt='Event Image' className='eventimage' />
          </div>
          <div className='eventinfo'>
            <h1>{group.name}</h1>
            <h2>{event.name}</h2>

            <p>Date {event.date} at {event.time}</p>
            <h4>At : {event.location}</h4>
            <p> {users.length} {group.nickname}s going</p>
            <hr />

            <p>Info : {event.description}</p>
            {}<Link to={{ pathname: '/editevent/' + this.state.event_id }}>Edit Event</Link>
          </div>
          <div className='eventattendees'>
            <h3>Attendees</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Event
