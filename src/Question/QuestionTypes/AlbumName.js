const createAlbumNameQuestion = function(tracksToUse){
  return new Promise(function(resolve, reject){
    const correctAlternative = Math.floor(Math.random() * (3))
    const alternatives = [];
    let audio_source = undefined
    for (let i = 0; i < 4; i++){
      const alternative = getAlternative(tracksToUse, alternatives)
      alternatives.push(alternative.album.name)
      if (i === correctAlternative)
        audio_source = alternative.preview_url
    }
    resolve({
      question: "What's the name of this album?",
      alternatives: alternatives,
      correct_alternative: correctAlternative,
      audio_source: audio_source,
    })
  })
}

function getAlternative(tracksToUse, usedAlternatives){
  let indexOfItemToPick = null
  do {
    indexOfItemToPick = Math.floor(Math.random() * (tracksToUse.length))
  } while (null === tracksToUse[indexOfItemToPick].preview_url)
  return tracksToUse[indexOfItemToPick]
}
export default createAlbumNameQuestion
