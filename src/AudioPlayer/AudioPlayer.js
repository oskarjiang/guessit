import React, { Component } from 'react';

class AudioPlayer extends Component{
    constructor(props){
        super(props);
        this.whenEnded = this.whenEnded.bind(this);
    }
    whenEnded(){
      this.props.whenEnded()
    }
    render(){
        if (null !== this.props.source &&
              undefined !== this.props.source)
          return <audio controls volume="0.0" onEnded={this.whenEnded} id="player" src={this.props.source} autoPlay></audio>
        return (<h3>
            No tune
        </h3>);
    }
}

export default AudioPlayer;