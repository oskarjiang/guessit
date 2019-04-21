import React, { Component } from 'react';
import QuestionFactory from '../QuestionFactory/QuestionFactory';
import LoadingDisplay from '../LoadingDisplay/LoadingDisplay';
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
    };
  } 
  componentDidMount() {
    this.getAllItemsInPlayList('https://api.spotify.com/v1/playlists/'+this.props.playlistId+'/tracks?limit=100&offset=0')
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
          return
        }
        this.getAllItemsInPlayList(next100)          
      })
      .catch((err) =>
         console.error("Token is outdated"+err)
      )
  }
  render(){
    if (!this.state.allTracksFetched)
      return (
        <LoadingDisplay/>
      );
    return (
      <div id="quiz">
        <QuestionFactory
          requestHeaders={this.props.requestHeaders}
          number={this.state.questionNumber}
          type={'ArtistName'}
          tracks={this.state.tracks}/>
      </div>
    );
  }
}
export default Quiz;
