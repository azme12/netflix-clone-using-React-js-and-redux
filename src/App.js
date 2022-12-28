import './App.css';
import { useEffect, useState } from 'react';
import FilmList from './components/FilmList';
import 'bootstrap/dist/css/bootstrap.css';
import FilmListHeading from './components/FilmListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';


const App = () => {
  const [films, setFilms] = useState([]);
  const [favoriteFilms, setFavoriteFilms] = useState([]);


  
  const [searchFilm, setSearchFilm] = useState('');


  const getFilmRequest = async (searchFilm) => {
 
    const url = `http://www.omdbapi.com/?s=${searchFilm}&apikey=d3d2a29c`;

    const response = await fetch(url);

    
    const responseJson = await response.json();

    if (responseJson.Search) {
      setFilms(responseJson.Search);
    }
  };

  
  useEffect(() => {
    getFilmRequest(searchFilm);
  }, [searchFilm]);

 
  useEffect(() => {
    const filmFavorites = JSON.parse(
      localStorage.getItem('your-favorites')
    );

    if (filmFavorites) {
      setFavoriteFilms(filmFavorites);
    }

  }, []);


  const saveToLocalStorage = (items) => {
    localStorage.setItem('your-favorites', JSON.stringify(items))
  }

  const addFavoriteFilm = (film) => {
    const newFavoriteList = [...favoriteFilms, film];
    setFavoriteFilms(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteFilm = (film) => {
    const newFavoriteList = favoriteFilms.filter(
      (favoriteFilm) => favoriteFilm.imdbID !== film.imdbID
    );
    setFavoriteFilms(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };


  return (
    <div className="App container-fluid film-css">
      <div className="row d-flex align-items-center mb-4">
        <FilmListHeading heading="Netflix WEB OF AZ" />
        <SearchBox searchFilm={searchFilm} setSearchFilm={setSearchFilm} />
      </div>

      <div className="row">
        <FilmList
          films={films}
          favoritesChosen={addFavoriteFilm}
          favorites={AddFavorites}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <FilmListHeading heading="Choose Your Favorite" />
      </div>

      <div className="row">
        <FilmList
          films={favoriteFilms}
          favoritesChosen={removeFavoriteFilm}
          favorites={RemoveFavorites}
        />
      </div>

    </div>
  );
}

export default App;
