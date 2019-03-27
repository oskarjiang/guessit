import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Question extends Component{
    render(){
        return <Container>
            <Row>
                <Col xs={12}>
                    <Jumbotron>
                        <h1>Hello, world!</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            <Alternatives alternatives={[1, 2, 3, 4]}/>
        </Container>
    }
}
class Alternatives extends Component{
    render(){
        return <div>     
            <Row>
                <Col xs={6}>
                    <Button variant="primary" size="lg" block>{this.props.alternatives[0]}</Button>
                </Col>
                <Col xs={6}>
                    <Button variant="primary" size="lg" block>{this.props.alternatives[1]}</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Button variant="primary" size="lg" block>{this.props.alternatives[2]}</Button>
                </Col>
                <Col xs={6}>
                    <Button variant="primary" size="lg" block>{this.props.alternatives[3]}</Button>
                </Col>
            </Row>
        </div>
    }
}

export default Question;
