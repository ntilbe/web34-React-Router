import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    console.log(id)
    const newObj = saved.find(item => item.id === id)
    // debugger;
    if (!newObj) {
      const newObj = movieList.find(item => item.id === id)
      const newArr = [...saved, newObj]
      setSaved(prevValue => [...prevValue, newObj])
    }
  }

  return (
    <Router>
      <div>
        <SavedList list={saved} />
        <Switch>
          <Route exact path='/'>
            <MovieList movies={movieList} />
          </Route>
          <Route path='/movies/:movieId'>
            <Movie handler={addToSavedList} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;