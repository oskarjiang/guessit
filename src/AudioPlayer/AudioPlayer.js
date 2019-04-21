import React, { Component } from 'react';
const axios = require('axios')

class AudioPlayer extends Component{
    constructor(props){
        super(props);
        this.state = { 
            source: undefined, 
            currentTrack: 0 
        };
        this.whenEnded = this.whenEnded.bind(this);
    }
    componentDidMount() {
        this.setSource(this.props.track.id)
    }
    setSource(trackId){
        const request = axios.create({
            baseURL: 'https://api.spotify.com/v1/tracks/'+trackId,
            headers: this.props.requestHeaders
        })
        request.get()
            .then((res) => {
                if (null === res.data.preview_url){
                  this.whenEnded()
                  return
                }
                this.setState({source: res.data.preview_url})
            })
            .catch((err) =>
                console.error("Token is outdated"+err)
            )
    }
    whenEnded(){
      this.props.whenEnded()
    }
    render(){
        if (null !== this.state.source &&
              undefined !== this.state.source)
          return <audio onEnded={this.whenEnded} id="player" src={this.state.source} autoPlay></audio>
        return (<h3>
            Loading song...
        </h3>);
    }
}

export default AudioPlayer;