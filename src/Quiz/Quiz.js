import React, { Component } from 'react';
import Question from '../Question/Question';
const axios = require('axios')

/*
    Props:    
        requestHeaders
        playlistId
*/
class Quiz extends Component{   
  constructor(props){
    super(props);
    this.state = { 
      tracks: [],
      complett: false,
      alternatives: undefined,
      correctAlternative: undefined,
      questionNumber: 1,
    };
    this.checkIfCorrectAnswer = this.checkIfCorrectAnswer.bind(this);
    this.getAlternatives = this.getAlternatives.bind(this);
  } 
  componentDidMount() {
    this.getAllItemsInPlayList('https://api.spotify.com/v1/playlists/'+this.props.playlistId+'/tracks?limit=100&offset=0')
  }
  getAllItemsInPlayList(playlistUrl){
    const request = axios.create({
      baseURL: playlistUrl,
      headers: this.props.requestHeaders
    })
    request.get()
      .then((res) => {
        const tracks = this.state.tracks
        res.data.items.map(item => tracks.push(item.track))
        this.setState({ tracks: tracks })
        const next100 = res.data.next
        if (null !== res.data.next){
          this.getAllItemsInPlayList(next100)
          return
        }
        this.getAlternatives();
      })
      .catch((err) =>
         console.error("Token is outdated"+err)
      )
  }
  checkIfCorrectAnswer(answerRight){
    if(answerRight)
      console.log('Right')
    else
      console.log('Wrong')
    this.setState({
      alternatives: undefined,
      correctAlternative: undefined,
      questionNumber: this.state.questionNumber + 1
    })
    setTimeout(this.getAlternatives, 1000)
  }
  getAlternatives(){
    const _alternatives = [];
    for (let i = 0; i < 4; i++)
      _alternatives.push(this.getAlternative())
    this.setState({
      alternatives: _alternatives
    })
    this.setCorrectAnswer()
  }
  getAlternative(){
    const indexOfItemToPick = Math.floor(Math.random() * (this.state.tracks.length))
    return this.state.tracks[indexOfItemToPick]
  }
  setCorrectAnswer(){
    this.setState({
      correctAlternative: Math.floor(Math.random() * (3))
    }) 
  }
  render(){
    if (undefined !== this.state.tracks &&
        undefined !== this.state.alternatives &&
        undefined !== this.state.correctAlternative)
      return (
        <div id="quiz">
          <Question
            number={this.state.questionNumber}
            alternatives={this.state.alternatives}
            questionText="Which artist's song is this?"
            correctAlternative={this.state.correctAlternative}
            checkAnswer={this.checkIfCorrectAnswer}/>
        </div>
      );
    return (
      <div id="quiz">
        <h3>
          Loading...
        </h3>
      </div>
    );
  }
}
export default Quiz;
