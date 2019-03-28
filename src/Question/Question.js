import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

/*
    Props:
        alternatives
*/
class Question extends Component{
    render(){
        return <Container>
            <Row>
                <Col xs={12}>
                    <Jumbotron>
                        <h1>Question 1</h1>
                        <p>
                            Which artist's song is this?
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            <Alternatives alternatives={this.props.alternatives}/>
        </Container>
    }
}
class Alternatives extends Component{
    render(){
        return <div>     
            <Row>
                <Col xs={6}>
                    <Button variant="primary" size="lg" block>{this.props.alternatives[0].artists[0].name}</Button>
                </Col>
                <Col xs={6}>
                    <Button variant="primary" size="lg" block>{this.props.alternatives[1].artists[0].name}</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Button variant="primary" size="lg" block>{this.props.alternatives[2].artists[0].name}</Button>
                </Col>
                <Col xs={6}>
                    <Button variant="primary" size="lg" block>{this.props.alternatives[3].artists[0].name}</Button>
                </Col>
            </Row>
        </div>
    }
}

export default Question;
