import React, { useContext, useState } from 'react';
import Card from './Card';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import api from '../utils/api';

import { usePopup } from '../hooks/usePopup';

import CurrentUserContext from '../contexts/CurrentUserContext';

import errorAvatar from '../images/profile/error-avatar.svg';
import defaultAvatar from '../images/profile/default-avatar.svg';

import { delay } from '../utils/constants';

function Main({
  cards,
  onCardLike,
  onUpdateUser,
  onUpdateAvatar,
  onAddPlace,
  setCards,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState({});
  const editAvatar = usePopup();
  const editProfile = usePopup();
  const addPlace = usePopup();
  const confirmDelete = usePopup();
  const imagePopup = usePopup();

  function handleCardClick(card) {
    setSelectedCard(card);
    imagePopup.open();
  }

  function handleCloseImagePopup() {
    imagePopup.close();
    setTimeout(() => {
      setSelectedCard();
    }, delay);
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    confirmDelete.open();
  }

  function handleCardDelete() {
    return api.deleteCard(selectedCard._id).then(() => {
      const newCards = cards.filter((card) => card._id !== selectedCard._id);
      setCards(newCards);
    });
  }

  return (
    <main className="content page__content unit page__unit container container_mobile-wide">
      <section className="profile content__profile unit">
        <>
          <div className="profile__avatar-container" onClick={editAvatar.open}>
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
              onClick={editProfile.open}
            />
            <p className="profile__about">{currentUser.about}</p>
          </div>{' '}
        </>
        <button
          type="button"
          className="profile__add-button"
          onClick={addPlace.open}
        />
        <EditProfilePopup
          isOpen={editProfile.isOpen}
          onClose={editProfile.close}
          onUpdateUser={onUpdateUser}
        />
        <AddPlacePopup
          isOpen={addPlace.isOpen}
          onClose={addPlace.close}
          onAddPlace={onAddPlace}
        />
        <EditAvatarPopup
          isOpen={editAvatar.isOpen}
          onClose={editAvatar.close}
          onUpdateAvatar={onUpdateAvatar}
        />
      </section>
      {cards && (
        <section className="cards unit">
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={handleCardClick}
                onLikeClick={onCardLike}
                onCardDelete={handleCardDeleteClick}
              />
            ))}
          </ul>
          <PopupWithForm
            isOpen={confirmDelete.isOpen}
            onClose={confirmDelete.close}
            form={{
              name: 'confirm-delete',
              title: 'Вы уверены?',
              action: 'Да',
              loaderAction: 'Удаление',
            }}
            onSubmit={handleCardDelete}
          />
          <ImagePopup
            card={selectedCard}
            onClose={handleCloseImagePopup}
            isOpen={imagePopup.isOpen}
          />
        </section>
      )}
    </main>
  );
}

export default Main;
