import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Header from './componentes/Header';
import MovieCard from './componentes/MovieCard';
import SectionTitle from './componentes/SectionTitle';
import SearchForm from './componentes/SearchForm';
import Logo from './componentes/Logo';
import SearchIcon from './componentes/SearchIcon';
import Spinner from './componentes/Spinner';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      searchActive: false,
      movies: []
    }
  }

  componentDidMount() {
    this.getPopularMovies();
  }

  getPopularMovies = () => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=fcc3e3e91b7cc38185ef902ca797ee11&page=1')
      .then(({ data: { results }}) => {
        console.log('resultados:', results);
        this.setState({
          isLoading: false,
          movies: results
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false
        });
      });
  }

  handleMovieSearch = movie => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fcc3e3e91b7cc38185ef902ca797ee11&query=${movie}&page=1&include_adult=false`)
      .then(({ data: { results }}) => {
        console.log(`buscando ${movie}`, results);
        this.setState({
          movies: results
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSearchButtonClick = () => {
    this.setState({
      searchActive: !this.state.searchActive
    }, console.log('toggled search!'));
  }

  render() {
    return (
      <div className="app">
        <Header
          onNavClick={this.getPopularMovies}
          logo={<Logo word="react" strong="movies" />}
          leftIcon={<SearchIcon onIconClick={this.handleSearchButtonClick} />}
        />

        {this.state.searchActive &&
          <section className="search-box">
            <SearchForm
              onSearch={this.handleMovieSearch}
              onClose={this.getPopularMovies}
            />
          </section>
        }

        <div className="movies-container">
          <SectionTitle>Most Popular Movies</SectionTitle>
          <section className="movies-wrapper">

            {this.state.isLoading &&
              <Spinner />
            }

            {this.state.movies.length > 0 && this.state.movies.map(movie => (
              <MovieCard
                key={movie.id}
                poster={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                title={movie.title}
                votes={movie.vote_average}
                year={movie.release_date}
              />
            ))}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
