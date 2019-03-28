import React, { Component } from 'react';
import Question from '../Question/Question';
import AudioPlayer from '../AudioPlayer';
const axios = require('axios')

/*
    Props:    
        requestHeaders
        playlistId
*/
class Quiz extends Component{   
    constructor(props){
        super(props);
        this.state = { 
            tracks: undefined,
            alternatives: undefined,
            correctAlternative: undefined,
        };
    } 
    componentDidMount() {
        this.setPlayList100()
    }
    setPlayList100(){
        const request = axios.create({
            baseURL: 'https://api.spotify.com/v1/playlists/'+this.props.playlistId+'/tracks',
            headers: this.props.requestHeaders
        })
        request.get()
        .then((res) => {
            const tracks = []
            res.data.items.map(item => tracks.push(item.track))
            this.setState({
                tracks: tracks
            })
            this.getAlternatives();
        })
        .catch((err) =>
            console.error("Token is outdated"+err)
        )
    }
    setCorrectAnswer(){
        this.setState({
            correctAlternative: Math.floor(Math.random() * (3))
        }) 
    }
    getAlternatives(){
        const _alternatives = [];
        for (let i = 0; i < 4; i++)
            _alternatives.push(this.getAlternative())
        this.setState({
            alternatives: _alternatives
        })
        this.setCorrectAnswer()
    }
    getAlternative(){
        const indexOfItemToPick = Math.floor(Math.random() * (this.state.tracks.length))
        return this.state.tracks[indexOfItemToPick]
    }
    render(){
        if (undefined !== this.state.tracks &&
            undefined !== this.state.alternatives &&
            undefined !== this.state.correctAlternative)
            return (
            <div id="quiz">
                <Question alternatives={this.state.alternatives}/>
                <AudioPlayer tracks={[this.state.alternatives[this.state.correctAlternative]]}/>
            </div>
            );
        else
            return (
            <div id="quiz">
                <h3>
                    Loading...
                </h3>
            </div>
            );
    }
}
export default Quiz;
