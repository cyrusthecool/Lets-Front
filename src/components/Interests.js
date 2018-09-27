import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const INTERESTS_SERVER_URL = 'https://backend-lets.herokuapp.com/interests.json'

class Interests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      interests: []
    }

    const fetchInterests = () => {
      axios.get(INTERESTS_SERVER_URL).then((results) => {
        this.setState({ interests: results.data })
      })
    }
    fetchInterests()
  }

  render () {
    const { interests } = this.state
    return (
      <div className='categorycontainer'>

        {interests && interests.interests && interests.interests.map((x) => {
          return(
            <Link className="interestName" onClick={this.forceUpdate} to={{ pathname: '/groups', search: `?filterBy=${x.name}` }}>
                  <div className={x.name}>{x.name}</div>
            </Link>
          )
        })}


      </div>
    )
  }
}

export default Interests
