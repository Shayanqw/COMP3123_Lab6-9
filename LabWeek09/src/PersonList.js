import React, { Component } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';

class PersonList extends Component {
    // Define state default values
    state = {
        persons: []
    }

    // Component Lifecycle Callback
    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                console.log(res.data);
                const persons = res.data.results;
                this.setState({ persons });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }

    render() {
        return (
            <Container className="mt-4">
                <h2 className="text-center mb-4">User Directory</h2>
                <Row>
                    {this.state.persons.map(person => (
                        <Col key={person.login.uuid} md={6} lg={4} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body className="d-flex align-items-center">
                                    <Image
                                        src={person.picture.medium}
                                        alt={`${person.name.first} ${person.name.last}`}
                                        roundedCircle
                                        className="me-3"
                                        width={80}
                                        height={80}
                                    />
                                    <div>
                                        <Card.Title className="h6 mb-1">
                                            {person.name.title} {person.name.first} {person.name.last}
                                        </Card.Title>
                                        <Card.Text className="text-muted small mb-1">
                                            <strong>Email:</strong> {person.email}
                                        </Card.Text>
                                        <Card.Text className="text-muted small mb-1">
                                            <strong>Phone:</strong> {person.phone}
                                        </Card.Text>
                                        <Card.Text className="text-muted small mb-0">
                                            <strong>Location:</strong> {person.location.city}, {person.location.country}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default PersonList;