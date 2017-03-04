import React from 'react';

const MovieCard = props => (
  <div className="movie-card">
    <img src={props.poster} alt="" className="poster" />
    <div className="title">{props.title}</div>
    <div className="info">
      <span className="rating"><i className="fa fa-star" aria-hidden="true"></i> {props.votes}</span>
      <span className="year">{props.year}</span>
    </div>
  </div>
);

MovieCard.DefaultProps = {
  poster: 'http://lorempixel.com/161/142/'
}

export default MovieCard;
