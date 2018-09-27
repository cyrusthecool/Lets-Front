import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Interests from './Interests'
import Loginpic from './Loginpic'

class Home extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Loginpic />
        <div className='interestscontainer'>
          <h3>Explore by Category</h3>
          <Interests />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
