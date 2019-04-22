import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
/*
    Props:
        number
        alternatives
        type
        tracks
*/
class Question extends Component{
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer(answerRight){
    if(answerRight)
      console.log('Right')
    else
      console.log('Wrong')
    this.setState({
      alternatives: undefined,
      correctAlternative: undefined,
    })
  }
  render(){
    return <Container>
      <Row>
        <Col xs={12}>
          <Jumbotron>
            <h1>Question {this.props.number}</h1>
            <p>
              {this.props.questionData.question}
            </p>
          </Jumbotron>
        </Col>
      </Row>
      <AlternativesGroup 
        alternatives={this.props.questionData.alternatives}
        checkAnswer={this.checkAnswer}/>
      <AudioPlayer 
        source={this.props.questionData.audio_source} 
        whenEnded={this.checkAnswer}/>
    </Container>
  }
}
/*
  Alternatives - tracks[]
  CheckAnswer - fun(track)
*/
class AlternativesGroup extends Component{
  constructor(props) {
    super(props);
    this.passChosenAlternativeNumberToParent = this.passChosenAlternativeNumberToParent.bind(this);
  }
  passChosenAlternativeNumberToParent(answerNumber){
    this.props.checkAnswer(answerNumber)
  }
  render(){
    return <div>     
      <Row>
        <Col xs={6}>
            <Button 
              variant="primary" 
              size="lg" 
              block
              onClick={this.passChosenAlternativeNumberToParent}
            >
              {this.props.alternatives[0]}
            </Button>
        </Col>
        <Col xs={6}>
            <Button 
              variant="primary" 
              size="lg" 
              block
              onClick={this.passChosenAlternativeNumberToParent}
            >
              {this.props.alternatives[1]}
            </Button>
        </Col>
      </Row>
      <Row>
          <Col xs={6}>
            <Button 
              variant="primary" 
              size="lg" 
              block
              onClick={this.passChosenAlternativeNumberToParent}
            >
              {this.props.alternatives[2]}
            </Button>
          </Col>
          <Col xs={6}>
            <Button 
              variant="primary" 
              size="lg" 
              block
              onClick={this.passChosenAlternativeNumberToParent}
            >
              {this.props.alternatives[3]}
            </Button>
          </Col>
      </Row>
  </div>
  }
}

export default Question;
