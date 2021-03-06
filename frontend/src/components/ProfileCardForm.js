import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Card, CardBody, Button, Input } from 'reactstrap';

/**
 * Show profile data in edit mode.
 */
class ProfileCardForm extends Component {

    constructor(props) {
        super(props)
    
        // transfer all profile data from parent
        this.state = {
             name: props.profile.name,
             image: props.profile.image,
             description: props.profile.description,
             link: props.profile.link
        }
    }
    
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleImageChange = (event) => {
        this.setState({
            image: event.target.value
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleLinkChange = (event) => {
        this.setState({
            link: event.target.value
        })
    }

    /**
     * Transfer new profile values back to parent
     * and deactivate the edit mode.
     * 
     * @param {*} event 
     */
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.updateProfile(this.state.name, this.state.description, this.state.image, this.state.link)
        this.props.toggleEditMode()
    }

    render() {
        const {toggleEditMode} = this.props
        return (
            <Form onSubmit={this.handleSubmit}>
                <Card>
                    <CardBody>
                            <FormGroup>
                                <Label for='name'>Full name</Label>
                                <Input type='text' id='name' value={ this.state.name } onChange={ this.handleNameChange } />
                            </FormGroup>
                            <FormGroup>
                                <Label for='image'>Image url</Label>
                                <Input type='text' id='image' value={ this.state.image } onChange={ this.handleImageChange } />
                            </FormGroup>
                            <FormGroup>
                                <Label for='description'>Description</Label>
                                <Input type='textarea' id='description' defaultValue={this.state.description} onChange={ this.handleDescriptionChange } />
                            </FormGroup>
                            <FormGroup>
                                <Label for='link'>Detail url</Label>
                                <Input id='link' defaultValue={this.state.link} onChange={ this.handleLinkChange } />
                            </FormGroup>
                        <div className="clearfix">
                            <Button type="submit" color="success" className="float-right" style={{ margin: '10px' }}>Save</Button>
                            <Button className="float-right" style={{ margin: '10px' }} onClick={toggleEditMode}>Cancel</Button>
                        </div>
                    </CardBody>
                </Card>
            </Form>
        )
    }
}

ProfileCardForm.propTypes = {
    profile: PropTypes.object.isRequired,
    toggleEditMode: PropTypes.func.isRequired
}

export default ProfileCardForm