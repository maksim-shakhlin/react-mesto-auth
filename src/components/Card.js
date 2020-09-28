import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import errorCard from '../images/card/error-image.svg';

function Card({ card, onCardClick, onLikeClick, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const likedClass = card.likes.some((item) => item._id === currentUser._id)
    ? ' card__like-button_liked'
    : '';
  card.liked = !!likedClass;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onLikeClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__list-item">
      <article className="card">
        <img
          className="card__image"
          src={card.link}
          alt={card.name}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = errorCard;
          }}
          onClick={handleClick}
        />
        {card.owner._id === currentUser._id ? (
          <button
            type="button"
            className="card__delete-button"
            onClick={handleDeleteClick}
          />
        ) : (
          ''
        )}
        <div className="card__info">
          <h2 className="card__title">{card.name}</h2>
          <div
            className={`card__like-button${likedClass}`}
            tabIndex="0"
            onClick={handleLikeClick}
          >
            <span className="card__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
