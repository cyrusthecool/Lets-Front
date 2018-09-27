import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import { Redirect } from 'react-router'
import _ from 'lodash'

const GROUP_SERVER_URL = 'https://backend-lets.herokuapp.com/groups/'
const INTEREST_SERVER_URL = 'https://backend-lets.herokuapp.com/interests.json'

class EditGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      description: '',
      location: '',
      image: '',
      nickname: '',
      interests: [],
      allInterests: [],
      redirect: false,
      btn1: true
    }
    this._handleSubmit = this._handleSubmit.bind(this)
    this._addInterest = this._addInterest.bind(this)
    axios.defaults.headers.common = {"Authorization": 'Bearer ' + localStorage.getItem('jwt')}

    const fetchGroup = () => {
      axios.get(GROUP_SERVER_URL + +(this.props.match.params.id) + '.json').then((results) => {
        const interests = results.data.interests.map((x) => x.id)
        console.log(interests)
        this.setState({
          id: results.data.id,
          name: results.data.name,
          description: results.data.description,
          location: results.data.location,
          image: results.data.image,
          nickname: results.data.nickname,
          interests: results.data.interests
        })
        console.log(this.state)
      })
    }
    fetchGroup()

    const fetchInterests = () => {
      axios.get(INTEREST_SERVER_URL).then((results) => {
        console.log(results.data)
        this.setState({
          allInterests: results.data.interests
        })
        console.log(this.state)
      })
    }
    fetchInterests()
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value })
    console.log(this.state)
  }

  editGroup(group) {
    console.log('editGroup', this.state)
    localStorage.getItem('jwt') == null ? false : axios.patch((GROUP_SERVER_URL + +(this.props.match.params.id) + '.json'), {headers:{"Authorization": 'Bearer ' + localStorage.getItem('jwt')}}, {data:{ id: group.id, name: group.name, description: group.description, image: group.image, location: group.location, nickname: group.nickname, interest_ids: group.interests.map((i) => i.id) }}).then((results) => {
      console.log('editGroup axios results', results.data)
      this.setState({ redirect: true })
    }).catch(function (error) {
      console.log(error.response)
    })
  }

  _handleSubmit(event) {
    event.preventDefault()
    this.editGroup(this.state)

  }

  _addInterest(event) {
    console.log(event)
    console.log(this.state.allInterests)
    const interest = _.filter(this.state.allInterests, { id: +(event.target.value) })
    console.log(interest)
    event.preventDefault()
    const currentInterests = this.state.interests
    this.setState({ interests: currentInterests.concat(interest), btn1: !this.state.btn1 })
    console.log(this.state)
  }




  render() {
    let btn_class = this.state.btn1 ? "blackButton" : "whiteButton";
    const { show } = this.state;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/groups' />;
    }
    return (

      <div className="container">
        <Header />
        <div className="creategroup">
        <h1>Edit Group</h1>
        <form onSubmit={this._handleSubmit}>
        <ul>
          <li><label>
            Name:
            <input type='text' name='name' onChange={this.handleChange('name')} value={this.state.name} />
          </label></li>
          <li><label><br></br>
            Description:
            <input type='text' name='name' onChange={this.handleChange('description')} value={this.state.description} />
          </label></li>
          <li><label><br></br>
            Location:
            <input type='text' name='name' onChange={this.handleChange('location')} value={this.state.location} />
          </label></li><br></br>
          <li><label>
            Image:
            <input type='text' name='name' onChange={this.handleChange('image')} value={this.state.image} />
          </label></li>
          <li><label><br></br>
            Nicknames:
            <input type='text' name='name' onChange={this.handleChange('nickname')} value={this.state.nickname} />
          </label></li><br></br>
          <div>
          {this.state.allInterests.map((x) => <MyButton click={this._addInterest} value={x.id} name={x.name} />)}
          </div>
          <input type='submit' value='Create' className='button' onClick={this._handleSubmit} />
          </ul>
        </form>
        </div>
      </div>
    )
  }
}

export default EditGroup


class MyButton extends Component {
  constructor(props) {
      super(props);
      this.toggleClass = this.toggleClass.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
          active: false,
      };
      console.log(this.props.value)
  }
  toggleClass() {
      const currentState = this.state.active;
      this.setState({ active: !currentState });
  };

  handleClick(){
    this.toggleClass();
    this.props.click()
  }

  render() {
      return (
          <div>
              <button type="button" className={this.state.active ? 'clicked': null} onClick={this.handleClick} value={this.props.value}>{this.props.name}</button>
          </div>
      )
}
}
