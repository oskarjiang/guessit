import React, { Component } from 'react';
import Question from '../Question/Question';
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
            tracks: [],
            complett: false,
            alternatives: undefined,
            correctAlternative: undefined,
        };
    } 
    componentDidMount() {
        this.getAllItemsInPlayList('https://api.spotify.com/v1/playlists/'+this.props.playlistId+'/tracks?limit=100&offset=0')
    }
    getAllItemsInPlayList(playlistUrl){
        const request = axios.create({
            baseURL: playlistUrl,
            headers: this.props.requestHeaders
        })
        request.get()
        .then((res) => {
            const tracks = this.state.tracks
            res.data.items.map(item => tracks.push(item.track))
            this.setState({ tracks: tracks })
            const next100 = res.data.next
            if (null !== res.data.next){
                this.getAllItemsInPlayList(next100)
                return
            }
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
                <Question
                    number="1"
                    alternatives={this.state.alternatives}
                    questionText="Which artist's song is this?"
                    correctAlternative={this.state.correctAlternative}/>
            </div>
            );
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
