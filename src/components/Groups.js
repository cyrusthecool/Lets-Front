import React, { Component } from 'react'
import Header from './Header'
import GroupsApi from './GroupsApi'
import Interests from './Interests'
import Footer from './Footer'

class Groups extends Component {
  render () {
    return (
      <div >
        <Header />
        <GroupsApi search={this.props.location.search} />
        <div className='interestsgroupscontainer'>
          <h1>Categories</h1>
          <Interests />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Groups
