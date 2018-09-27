import React, { Component } from 'react'
import axios from 'axios'

const USER_SERVER_URL = 'https://backend-lets.herokuapp.com/users/'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      location: [],
      bio: [],


    }

    const fetch_user = () => {
      let url = USER_SERVER_URL + this.props.match.params.id + '.json';
      axios.get(url).then((result) => {

        this.setState({
          name: result.data.user.name,
          location: result.data.user.location,
          bio: result.data.user.bio
        })
      }).catch((errors) => {
        console.log(errors);
      })
    }

    fetch_user();
  }

  render() {
    const { user } = this.state
    return (
      <div>
        <h1>Welcome {this.state.name}</h1>
        <p>{this.state.location}</p>
        <p>{this.state.bio}</p>
      </div>
    );
  }
}

export default User;
