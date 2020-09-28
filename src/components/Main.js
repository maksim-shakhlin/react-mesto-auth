import React from 'react';
import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';

import errorAvatar from '../images/profile/error-avatar.svg';
import defaultAvatar from '../images/profile/default-avatar.svg';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardLike(card) {
    onCardLike(card);
  }

  function handleCardDelete(card) {
    onCardDelete(card);
  }

  return (
    <main className="content page__content unit page__unit page__unit_narrow">
      <section className="profile content__profile">
        {currentUser && (
          <>
            <div className="profile__avatar-container" onClick={onEditAvatar}>
              <img
                src={currentUser.avatar || defaultAvatar}
                alt="Аватар пользователя"
                className="profile__avatar"
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = errorAvatar;
                }}
              />
              <div className="profile__avatar-overlay" />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              />
              <p className="profile__about">{currentUser.about}</p>
            </div>{' '}
          </>
        )}
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      {cards && (
        <section className="cards">
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onLikeClick={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Main;
