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
        this.setSource(this.props.tracks[this.state.currentTrack].id)
        // const audioPlayer = document.getElementById('player');
        // if (audioPlayer)
        //     audioPlayer.addEventListener("ended",() => {
        //         this.setState({
        //             currentTrack: this.state.currentTrack + 1
        //         })
        //         this.setSource(this.props.tracks[this.state.currentTrack].id)
            // });
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
        if (undefined !== this.state.source){
            if (this.props.withGui){
                return (<div>
                    <TrackInfo track={this.props.tracks[this.state.currentTrack]}/>
                    <audio id="player" controls src={this.state.source} autoPlay></audio>
                </div>);
            }
            else{
                return <audio id="player" src={this.state.source} autoPlay></audio>
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