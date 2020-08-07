import React, { Component } from 'react';

import './App.css'
import axios from 'axios'
import ProfileCard from './components/ProfileCard'
import ProfileCardForm from './components/ProfileCardForm'
import { Container, Spinner, Row, Col } from 'reactstrap'

class App extends Component {

  constructor(props) {
    super(props)

    /**
     * the following state values will be used:
     * 
     *   *loading* - "true" until some profile data are available
     * 
     *   *editMode* - "true" if the user is in edit mode. 
     *                 "false" means that the profile data is shown (read only mode)
     * 
     *   *profile* - contains the profile data (id, name, image, description, link)
     */
    this.state = {
      loading: true,
      editMode: false,
      profile: null
    }
  }

  /**
   * Get the initial profile data (api call).
   */
  async componentDidMount() {
    const backendUrl = '/profile'
    const response = await axios.get( backendUrl )
    this.setState({profile: response.data, loading: false});
  }

  /**
   * Persist the profile data (api call).
   */
  persistProfileData() {
    console.log('persistProfileData -> ', this.state)
    const backendUrl = '/profile'
    axios.put( backendUrl, this.state.profile )
    .then(response => {
      console.log('Profile data successfully updated.')
    })
    .catch(error => {
      console.log('Error while updating profile data. ', error)
    })
  }

  /**
   * Update and persist the current profile data.
   * 
   * @param {string} name - Full name of person.
   * @param {string} description - Full description.
   * @param {string} image - An avatar image url.
   * @param {string} link - An url to further informations.
   * 
   * //TODO: This has to be splitted in two actions. 
   *         Perhaps here we can have two buttons ("preview" and "save").
   */
  updateProfile = (name, description, image, link) => {
    this.setState( {
      profile: {  id: this.state.profile.id,
                  name: name, 
                  description: description,
                  image: image, 
                  link: link }
    }, () => this.persistProfileData())
  }

  /**
   * Set the view to readOnly or editable.
   */
  toggleEditMode = () => {
    console.log("Toggle edit mode (current state is " + this.state.editMode + ")")
    this.setState( (prevState) => ({ editMode: !prevState.editMode }));
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
