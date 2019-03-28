import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import AudioPlayer from '../AudioPlayer';

/*
    Props:
        number
        alternatives
        questionText    
        correctAlternative
*/
class Question extends Component{
    render(){
        return <Container>
            <Row>
                <Col xs={12}>
                    <Jumbotron>
                        <h1>Question {this.props.number}</h1>
                        <p>
                            {this.props.questionText}
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            <Alternatives alternatives={this.props.alternatives}/>
            <AudioPlayer tracks={[this.props.alternatives[this.props.correctAlternative]] }/>
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
