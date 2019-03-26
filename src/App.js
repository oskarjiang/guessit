import React, { Component } from 'react';
import './App.css';
import config from './config.js';
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
          console.log(err)
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
          console.log(err)
      )
  }
  render(){
    return <audio controls src={this.state.source} autoPlay></audio>
  }
}

export default App;
