import React, { Component } from 'react';
import './App.css';
import config from './config.js';
import AudioPlayer from './AudioPlayer';
const axios = require('axios')
class App extends Component {
  constructor(props){
    super(props);
    this.state = { tracks: undefined };
  }
  componentDidMount() {
    const request = axios.create({
      baseURL: 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5',
      headers: config.requestHeaders
    })
    request.get()
      .then((res) => {
        let tracks = []
        res.data.items.map(item => tracks.push(item.id))
        this.setState({
          tracks: tracks
        })
      })
      .catch((err) =>
        alert("Token is outdated"+err)
      )
  }
  render() {
    if (undefined !== this.state.tracks)
      return (
        <div className="App">
          <AudioPlayer songUri={this.state.tracks[Math.floor(Math.random() * 10)]} />
        </div>
      );
    else
      return (
        <div className="App">
        </div>
      )
  }
}

export default App;
