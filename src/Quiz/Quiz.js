import React, { Component } from 'react';
import Question from '../Question/Question';
import LoadingDisplay from '../LoadingDisplay/LoadingDisplay';
import createQuestionWithRandomType from '../Question/QuestionFactory';
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
      questionNumber: 1,
      allTracksFetched: false,
      currentQuestion: undefined,
    };
  } 
  componentDidMount() {
    this.getAllItemsInPlayList('https://api.spotify.com/v1/playlists/'+this.props.playlistId+'/tracks?limit=100&offset=0')
  }

  getQuestions(tracksToUse){
    var question = createQuestionWithRandomType(tracksToUse, this.props.requestHeaders)
    question.then((res) => {
      this.setState({currentQuestion: res})
      console.log(res)
    })
    .catch((err) =>
         console.error(err)
      )
  }

  // Set state.tracks to all items in playlist
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
        if (null === res.data.next){
          this.setState({allTracksFetched: true})
          this.getQuestions(this.state.tracks)
          return
        }
        this.getAllItemsInPlayList(next100) 
      })
      .catch((err) =>
         console.error("Token is outdated"+err)
      )
  }
  render(){
    if (!this.state.currentQuestion)
      return (
        <LoadingDisplay/>
      );
    return (
      <div id="quiz">
        <Question
          number={this.state.questionNumber}
          questionData={this.state.currentQuestion}/>
      </div>
    );
  }
}
export default Quiz;
