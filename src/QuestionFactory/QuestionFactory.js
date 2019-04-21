import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import LoadingDisplay from '../LoadingDisplay/LoadingDisplay';
/*
    Props:
        number
        alternatives
        type
        tracks
*/
class QuestionFactory extends Component{
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.state = {
      alternatives: undefined,
      correctAlternative: undefined,
    }
  }

  componentDidMount(){
    this.getAlternatives()
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
  
  // Set state.alternatices to 4 tracks
  getAlternatives(){
    const _alternatives = [];
    for (let i = 0; i < 4; i++){
      const indexOfItemToPick = Math.floor(Math.random() * (this.props.tracks.length))
      const alternative = this.props.tracks[indexOfItemToPick]
      _alternatives.push(alternative)
    }
    this.setState({
      alternatives: _alternatives,
      correctAlternative: Math.floor(Math.random() * (3)),
    })
  }
  render(){
    if (undefined === this.state.alternatives)
      return(
        <LoadingDisplay/>
      );
    return <Container>
      <Row>
        <Col xs={12}>
          <Jumbotron>
            <h1>Question {this.props.number}</h1>
            <p>
              Plceholder
            </p>
          </Jumbotron>
        </Col>
      </Row>
      <AlternativesGroup 
        alternatives={this.state.alternatives}
        checkAnswer={this.checkAnswer}/>
      <AudioPlayer 
        requestHeaders={this.props.requestHeaders}
        track={this.state.alternatives[this.state.correctAlternative] } 
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
              Test1
            </Button>
        </Col>
        <Col xs={6}>
            <Button 
              variant="primary" 
              size="lg" 
              block
              onClick={this.passChosenAlternativeNumberToParent}
            >
              Test2
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
              Test3
            </Button>
          </Col>
          <Col xs={6}>
            <Button 
              variant="primary" 
              size="lg" 
              block
              onClick={this.passChosenAlternativeNumberToParent}
            >
              Test4
            </Button>
          </Col>
      </Row>
  </div>
  }
}

export default QuestionFactory;
