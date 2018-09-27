import React, { Component } from 'react'
import Calendar from 'react-calendar'
import { history } from '../Routes'

class Calendar2 extends Component {
  onChange = (date) => {
    const newDate = date.toLocaleDateString().split('/').reverse().join('-')
    history.push({
      pathname: '/events',
      search: `?filterBy=${newDate}`
    })
  }

  render() {
    const { date } = this.props
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={ date ? new Date(this.props.date) : new Date() }
          className='calendar'
        />
      </div>
    )
  }
}

export default Calendar2
