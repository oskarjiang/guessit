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
          return <audio volume="0.5" onEnded={this.whenEnded} id="player" src={this.props.source} autoPlay></audio>
        return (<h3>
            No tune
        </h3>);
    }
}

export default AudioPlayer;