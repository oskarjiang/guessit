import React, { Component } from 'react';
import './App.css';
import config from './config.js';
import Quiz from './Quiz/Quiz';
const axios = require('axios')
class App extends Component {
  constructor(props){
    super(props);
    this.state = { tracks: undefined };
  }
  componentDidMount() {
    this.setPlayList100()
  }

  // Set state.tracks to top tracks
  setTracksToUsersTop(){
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
        console.error("Token is outdated"+err)
      )
  }
  setPlayList100(){
    const request = axios.create({
      baseURL: 'https://api.spotify.com/v1/playlists/3Xt8b8Zs1fuZ0CkDsaPOdY/tracks',
      headers: config.requestHeaders
    })
    request.get()
      .then((res) => {
        let tracks = []
        res.data.items.map(item => tracks.push(item.track))
        this.setState({
          tracks: tracks
        })
      })
      .catch((err) =>
        console.error("Token is outdated"+err)
      )
  }
  render() {
    return (
        <div className="App">
            <Quiz
                playlistId='3Xt8b8Zs1fuZ0CkDsaPOdY'
                requestHeaders={config.requestHeaders}
            />
        </div>
    );
  }
}

export default App;
