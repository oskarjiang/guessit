import createArtistNameQuestion from './QuestionTypes/ArtistName';
import createReleaseYearQuestion from './QuestionTypes/ReleaseYear';
import createSongNameQuestion from './QuestionTypes/SongName';
import createAlbumNameQuestion from './QuestionTypes/AlbumName';

const questionTypes = {
  artistName: createArtistNameQuestion,
  releaseDate: createReleaseYearQuestion,
  songName: createSongNameQuestion,
  albumName: createAlbumNameQuestion,
}

const createQuestionWithRandomType = function(tracks, requestHeaders){
  let randomNumber = Math.floor(Math.random() * (Object.keys(questionTypes).length))
  let randomType = Object.keys(questionTypes)[randomNumber]
  return new Promise(function(resolve, reject){
    var questionCreator = questionTypes[randomType](tracks, requestHeaders)
    questionCreator
      .then((res) => resolve(res))
      .catch((res) => reject(res))
  });
}

export default createQuestionWithRandomType