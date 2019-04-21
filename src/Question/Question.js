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
        questionText    
        correctAlternative
        fun(track)
*/
class Question extends Component{
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
  }
  checkAnswer(answerNumber){
    this.props.checkAnswer(answerNumber === this.props.correctAlternative)
  }
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
      <AlternativesGroup 
        alternatives={this.props.alternatives}
        checkAnswer={this.checkAnswer}/>
      <AudioPlayer 
        requestHeaders={this.props.requestHeaders}
        tracks={[this.props.alternatives[this.props.correctAlternative]] } 
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
          <Alternative 
            checkAnswer={this.passChosenAlternativeNumberToParent} 
            alternative={this.props.alternatives[0]}
            alternativeNumber='0'/>
        </Col>
        <Col xs={6}>
          <Alternative 
            checkAnswer={this.passChosenAlternativeNumberToParent} 
            alternative={this.props.alternatives[1]}
            alternativeNumber='1'/>
        </Col>
      </Row>
      <Row>
          <Col xs={6}>
            <Alternative 
              checkAnswer={this.passChosenAlternativeNumberToParent} 
              alternative={this.props.alternatives[2]}
              alternativeNumber='2'/>
          </Col>
          <Col xs={6}>
            <Alternative 
              checkAnswer={this.passChosenAlternativeNumberToParent} 
              alternative={this.props.alternatives[3]}
              alternativeNumber='3'/>
          </Col>
      </Row>
  </div>
  }
}

class Alternative extends Component{
  constructor(props) {
    super(props);
    this.passChosenAlternativeNumberToParent = this.passChosenAlternativeNumberToParent.bind(this);
  }
  passChosenAlternativeNumberToParent(){
    this.props.checkAnswer(Number.parseInt(this.props.alternativeNumber))
  }
  render(){
    return <Button 
      variant="primary" 
      size="lg" 
      block
      onClick={this.passChosenAlternativeNumberToParent}
    >
      {this.props.alternative.artists[0].name}
    </Button>
  }
}

export default Question;
