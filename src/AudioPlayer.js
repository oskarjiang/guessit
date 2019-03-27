import React, { Component } from 'react';
import config from './config.js';
const axios = require('axios')

class AudioPlayer extends Component{
    constructor(props){
      super(props);
      this.state = { source: undefined };
    }
    componentDidMount() {
      const request = axios.create({
        baseURL: 'https://api.spotify.com/v1/tracks/'+this.props.songUri,
        headers: config.requestHeaders
      })
      request.get()
        .then((res) => {
          this.setState({source: res.data.preview_url})
        })
        .catch((err) =>
            alert("Token is outdated"+err)
        )
    }
    render(){
      return <audio controls src={this.state.source} autoPlay></audio>
    }
  }
  
export default AudioPlayer;