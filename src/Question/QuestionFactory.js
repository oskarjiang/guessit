import createArtistNameQuestion from './QuestionTypes/ArtistName';

const createQuestionWithRandomType = function(tracks, requestHeaders){
  return new Promise(function(resolve, reject){
    var questionCreator = createArtistNameQuestion(tracks, requestHeaders)
    questionCreator
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  });
} 

export default createQuestionWithRandomType