import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import { Link } from 'react-router-dom';
import url from 'url'
import _ from 'lodash'
import Calendar2 from './Calendar2'
import helpers from './helpers'

const SERVER_URL = "https://backend-lets.herokuapp.com/"

class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: []
    }
    axios.get(SERVER_URL + 'events.json').then(events => {
      this.setState({
        events: events.data.events
      })
    })
  }
  render () {
    const { location } = this.props
    const { events } = this.state
    const date = url.parse(location.search, true).query.filterBy
    const eventsFiltered = location.search == '' ? _.sortBy(events, ['date']) : _.filter(events, { date })

    console.log(location)

    return (
      <div className='maincontainer'>
        <Header />
        <div className='container'>

          <div className='col-sm-4 sidebar'>
            <Calendar2 date={date} />
            {eventsFiltered.map(event => {
              return (
                <div className='eventtitle'>
                  <h3>
                    <Link to={{ pathname: '/events/' + event.id }} >{event.name}</Link>
                  </h3>
                  <p>date: {helpers.convertdate(event.date)}</p>
                  <p>Description : {event.description}</p>
                </div>
              )
            })}

          </div>
        </div>
      </div>

    )
  }
}



export default Events;
