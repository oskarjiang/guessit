import React, { Component } from 'react';
import './App.css';
import Quiz from '../Quiz/Quiz';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
const axios = require('axios')
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginQueryParams: "https://accounts.spotify.com/authorize?client_id=e0597c6269bb4bcfbb0e811f3f6c937d&response_type=token&redirect_uri=http://localhost:3000&scope=playlist-read-collaborative,playlist-read-private",
      playListToUse: undefined,
      userPlaylists: []
    };
    this.setPlaylistToUse = this.setPlaylistToUse.bind(this);
  }
  componentDidMount() {
    const token = window.location.hash.substring(1).split('&')[0].split('=')[1];
    if (token){
      this.setState({
        requestHeaders: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token,
        }
      });
      this.setPlayLists(token)
    }
  }

  // Sends a request for user's playlists, sets the state when finished
  setPlayLists(token){    
    const request = axios.create({
      baseURL: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        "Authorization": "Bearer "+token,
      }
    })
    request.get()
      .then((res) => {
        this.setState({userPlaylists: res.data.items})
      })
      .catch((err) =>
         console.error("Error fetching playlists "+err)
      )
  }

  // Sets the state with playlist chosen
  setPlaylistToUse(e){
    this.setState({playListToUse: e.target.id})
  }

  render() {
    if (undefined !== this.state.requestHeaders){
      if (undefined !== this.state.userPlaylists)
        if (undefined !== this.state.playListToUse)
          // Render Quiz if playlist has been choosen
          return (
            <div className="App">
                <Quiz
                    playlistId={this.state.playListToUse}
                    requestHeaders={this.state.requestHeaders}
                />
            </div>)
        // Render playlist chooser if no playlist is chosen
        return(
          <div className="App">
              {this.state.userPlaylists.map((playList, i) =>
                <Row>
                  <Button 
                    id={playList.id}
                    key={i}
                    onClick={this.setPlaylistToUse}>
                    {playList.name}
                  </Button>
                </Row>
              )}
          </div>)
    }
    return(
      <a href={this.state.loginQueryParams}>Login with Spotify</a>)
    ;
  }
}

export default App;
