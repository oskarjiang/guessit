import React, { Component } from 'react';
import './App.css';
import config from './config.js';
import Quiz from './Quiz/Quiz';
const axios = require('axios')
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: undefined,
      loginQueryParams: "https://accounts.spotify.com/authorize?client_id=e0597c6269bb4bcfbb0e811f3f6c937d&response_type=token&redirect_uri=http://localhost:3000"
    };
  }
  componentDidMount() {
    const token = window.location.hash.substring(1).split('&')[0].split('=')[1];
    if (token)
      this.setState({
        requestHeaders: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        }
      });
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
  render() {
    if (undefined !== this.state.requestHeaders)
      return (
          <div className="App">
              <Quiz
                  playlistId='3Xt8b8Zs1fuZ0CkDsaPOdY'
                  requestHeaders={this.state.requestHeaders}
              />
          </div>)
      else
          return(
            <a href={this.state.loginQueryParams}>Login with Spotify</a>)
    ;
  }
}

export default App;
