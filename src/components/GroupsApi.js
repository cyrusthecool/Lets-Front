import React, { Component } from 'react'
import axios from 'axios'
import url from 'url'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const GROUPS_SERVER_URL = 'https://backend-lets.herokuapp.com/groups.json'

class GroupsApi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groups: [],
      filterWords: '',
      roles: []
    }

    const searchfield = url.parse(this.props.search, true).query
    const filterWord = searchfield.filterBy

    const fetchGroups = () => {
      if (filterWord !== undefined) {
        axios.get(GROUPS_SERVER_URL).then((results) => {
          const data2 = _.filter(results.data.groups, data => _.some(data.interests, { name: filterWord }))
          this.setState({ groups: data2, filterWords: filterWord })
        })
      } else if (localStorage.getItem('user_id')) {
        axios.get(GROUPS_SERVER_URL).then((results) => {
          const data2 = _.filter(results.data.groups, data => _.some(data.roles, { 'user_id': +(localStorage.getItem('user_id')) }))
          this.setState({ groups: data2 })
        })
      }
      else {
        axios.get(GROUPS_SERVER_URL).then((results) => {
          this.setState({ groups: results.data.groups })
        })
      }
    }
    fetchGroups()
  }

  

 checkJoined = (x) => {
  return _.some(x.roles, (r) => { return r.user_id == localStorage.getItem('user_id') })
 }

  render () {
    const { groups } = this.state
    return (
      <div className='groupscontainer2'>
        {this.state.filterWords !== undefined ? <h2 className='groupsinterestname'>{this.state.filterWords}</h2> : null}
        <div className='groupscontainer'>
          {groups && groups.map((x) => <div className='groupsdiv'>{this.checkJoined(x) ? <p>✔</p> : false}<Link to={`/groups/${x.id}`} key={x.id} className='grouplink'>{x.name}</Link> <img src={x.image} className='groupsimage' height="200" alt='Logo' /></div>)}
        </div>
      </div>
    )
  }
}

export default GroupsApi


// if some =>group.roles.user_id ==  localstorage.getitem(userid)
// 