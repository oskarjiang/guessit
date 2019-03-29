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
        this.whenEnded = this.whenEnded.bind(this);
    }
    componentDidMount() {
        this.setSource(this.props.tracks[this.state.currentTrack].id)
    }
    setSource(trackId){
        const request = axios.create({
            baseURL: 'https://api.spotify.com/v1/tracks/'+trackId,
            headers: config.requestHeaders
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
              undefined !== this.state.source){
            if (this.props.withGui){
                return (<div>
                    <audio onEnded={this.whenEnded} id="player" controls src={this.state.source} autoPlay></audio>
                </div>);
            }
            else{
                return <audio onEnded={this.whenEnded} id="player" src={this.state.source} autoPlay></audio>
            }
        }
        else{
            return (<h3>
                Loading song...
            </h3>);
        }
    }
}

class TrackInfo extends Component{
    render(){
        return <div>
            <h1>{this.props.track.name}</h1>
            <h1>{this.props.track.artists[0].name}</h1>
            <h1>{this.props.track.album.name}</h1>
            <h1>{this.props.track.popularity}</h1>
        </div>
    }
}

export default AudioPlayer;