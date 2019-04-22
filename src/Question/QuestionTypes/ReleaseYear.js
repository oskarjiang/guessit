const createReleaseYearQuestion = function(tracksToUse){
  return new Promise(function(resolve, reject){
    const correctAlternative = Math.floor(Math.random() * (3))
    const alternatives = [];
    let audio_source = undefined
    for (let i = 0; i < 4; i++){
      const alternative = getAlternative(tracksToUse, alternatives)
      alternatives.push(alternative.album.release_date.substring(0,4))
      if (i === correctAlternative)
        audio_source = alternative.preview_url
    }
    resolve({
      question: "Which year was this song released?",
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
export default createReleaseYearQuestion
