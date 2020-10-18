import React, { useContext } from 'react';
import classNames from 'classnames';

import CurrentUserContext from '../contexts/CurrentUserContext';
import errorCard from '../images/card/error-image.svg';

function Card({ card, onCardClick, onLikeClick, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  card.liked = card.likes.some((item) => item === currentUser._id);

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
        {card.owner === currentUser._id ? (
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
            className={classNames('card__like-button', {
              'card__like-button_liked': card.liked,
            })}
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
