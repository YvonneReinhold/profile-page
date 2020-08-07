import React, { Component } from 'react';

import './App.css'
import axios from 'axios'
import ProfileCard from './components/ProfileCard'
import ProfileCardForm from './components/ProfileCardForm'
import { Container, Spinner, Row, Col } from 'reactstrap'

class App extends Component {
  state = {
    loading: true,
    editMode: false,
    profile: null
  }
  
  async componentDidMount() {
    // const backendUrl = "https://api.randomuser.me";
    // this.setState({profile: data.results[0], loading: false});
    // console.log(data.results[0]);
    const backendUrl = '/profile'
    const response = await axios.get( backendUrl )
/*   let a = 0;
     for (let i = 0;  i<9999999; i++) {
      a = a + i*200;
    } */
    this.setState({profile: response.data, loading: false});
  }

  persistProfileData() {
    console.log('persistProfileData -> ', this.state)
    const backendUrl = '/profile'
    axios.put( backendUrl, this.state.profile )
    .then(response => {
      console.log('Updated profile data. Response is ', response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  toggleEditMode = () => {
    console.log("Toggle edit mode (current state is " + this.state.editMode + ")")
    this.setState( (prevState) => ({ editMode: !prevState.editMode }));
  }

  updateProfile = (name, description, image, link) => {
    console.log('udpateProfile(' + name + ',' + description + ',' + image + ',' + link + ')')
    console.log('state', this.state)
    this.setState( {
      profile: {  id: this.state.profile.id,
                  name: name, 
                  description: description,
                  image: image, 
                  link: link }
    }, () => this.persistProfileData())
  }

  render() {
    let component = null;
    if ( this.state.loading || !this.state.profile ) {
      component = <Spinner color="dark" />
    } else if ( this.state.editMode ) {
      component = <ProfileCardForm profile={this.state.profile} toggleEditMode={this.toggleEditMode} updateProfile={this.updateProfile}/>
    } else {
      component = <ProfileCard profile={this.state.profile} toggleEditMode={this.toggleEditMode} />
    }

    return (
        <div>
          <Container className="main-area" fluid>
            <Row>
              <Col>
                { component }
              </Col>
            </Row>
          </Container>
        </div>
    )
  }
}

export default App;
