import React, { Component } from 'react';
import config from './config.js';
const axios = require('axios')

class AudioPlayer extends Component{
    constructor(props){
      super(props);
      this.state = { 
        source: undefined, 
        currentTrack: 0 
        };
    }
    componentDidMount() {
      this.setSource(this.props.tracks[this.state.currentTrack])
      const audioPlayer = document.getElementById('player');
      audioPlayer.addEventListener("ended",() => {
        this.setState({
            currentTrack: this.state.currentTrack + 1
        })
        this.setSource(this.props.tracks[this.state.currentTrack])
    });
    }
    playNextSong(){
        
    }
    setSource(trackId){
        const request = axios.create({
            baseURL: 'https://api.spotify.com/v1/tracks/'+trackId,
            headers: config.requestHeaders
          })
          request.get()
            .then((res) => {
              this.setState({source: res.data.preview_url})
            })
            .catch((err) =>
                console.error("Token is outdated"+err)
            )
    }
    render(){
      return <audio id="player" controls src={this.state.source} autoPlay></audio>
    }
  }
  
export default AudioPlayer;