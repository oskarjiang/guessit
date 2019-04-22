const axios = require('axios')
const createArtistNameQuestion = function(tracksToUse, requestHeaders){
  return new Promise(function(resolve, reject){    
    const request = axios.create({
      baseURL: 'https://api.spotify.com/v1/tracks/2VxeLyX666F8uXCJ0dZF8B',
      headers: requestHeaders
    })
    request.get()
        .then((res) => {
            if (null === res.data.preview_url){
              this.whenEnded()
              return
            }
            resolve({
              question: "Who's the artist?",
              alternatives: [
                'Westlife',
                'BSB',
                'Ghost',
                'Justin Bieber',
              ],
              correct_alternative: 3,
              audio_source: res.data.preview_url
            })
        })
        .catch((err) =>
          reject(err)
        )
  })
}

// Set state.alternatices to 4 tracks
function getAlternatives(){
  const _alternatives = [];
  for (let i = 0; i < 4; i++){
    const indexOfItemToPick = Math.floor(Math.random() * (this.props.tracks.length))
    const alternative = this.props.tracks[indexOfItemToPick]
    _alternatives.push(alternative)
  }
  this.setState({
    alternatives: _alternatives,
    correctAlternative: Math.floor(Math.random() * (3)),
  })
}

export default createArtistNameQuestion

