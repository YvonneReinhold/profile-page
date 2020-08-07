import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, CardLink } from 'reactstrap';

/**
 * Show profile data in readOnly mode.
 */
class ProfileCard extends Component {

    render() {
        const {name, image, description, link } = this.props.profile
        const {toggleEditMode} = this.props
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle className='card-title'>{name}</CardTitle>
                    </CardBody>
                    <CardImg src={image} alt={name} title={name}/>
                    <CardBody>
                        <CardText>{description}</CardText>
                        <CardLink href={link} target='_blank'>Futher informations</CardLink>
                    </CardBody>
                    <div className="clearfix">
                        <Button className="float-right" style={{ margin: '10px' }} onClick={toggleEditMode}>Edit</Button>
                    </div>
                </Card>
          </div>
        )
    }
}

ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileCard