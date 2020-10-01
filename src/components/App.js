import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import CurrentUserContext from '../contexts/CurrentUserContext';

import { handleError } from '../utils/utils';
import { delay } from '../utils/constants';
import api from '../utils/api';
import { cleanData } from './../utils/utils';

function App() {
  const [showTopMenu, setShowTopMenu] = React.useState();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(
    false
  );
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [showAddPlaceLoader, setShowAddPlaceLoader] = React.useState(false);
  const [showEditAvatarLoader, setShowEditAvatarLoader] = React.useState(false);
  const [showEditProfileLoader, setShowEditProfileLoader] = React.useState(
    false
  );
  const [showDeleteCardLoader, setShowDeleteCardLoader] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then((data) => {
        setCurrentUser(data[0]);
        setCards(data[1]);
      })
      .catch((error) => handleError(error));
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setInfoTooltipOpen(false);
    setTimeout(() => {
      setSelectedCard();
    }, delay);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser(data) {
    setShowEditProfileLoader(true);
    api
      .setUserInfo(cleanData(data))
      .then((user) => {
        setEditProfilePopupOpen(false);
        setCurrentUser(user);
      })
      .catch((error) => handleError(error))
      .finally(() => {
        setTimeout(() => {
          setShowEditProfileLoader(false);
        }, delay);
      });
  }

  function handleCardLike(card) {
    api
      .changeLikeCardStatus(card._id, !card.liked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((error) => handleError(error));
  }

  function handleUpdateAvatar(avatar) {
    setShowEditAvatarLoader(true);
    api
      .setAvatar(cleanData({ avatar }))
      .then((a) => {
        setEditAvatarPopupOpen(false);
        setCurrentUser(a);
      })
      .catch((error) => handleError(error))
      .finally(() => {
        setTimeout(() => {
          setShowEditAvatarLoader(false);
        }, delay);
      });
  }

  function handleAddPlaceSubmit(place) {
    setShowAddPlaceLoader(true);
    api
      .addCard(cleanData(place))
      .then((card) => {
        setAddPlacePopupOpen(false);
        setCards([card, ...cards]);
      })
      .catch((error) => handleError(error))
      .finally(() => {
        setTimeout(() => {
          setShowAddPlaceLoader(false);
        }, delay);
      });
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setConfirmDeletePopupOpen(true);
  }

  function handleConfirmCardDelete() {
    setShowDeleteCardLoader(true);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter((card) => card._id !== selectedCard._id);
        setConfirmDeletePopupOpen(false);
        setCards(newCards);
      })
      .catch((error) => handleError(error))
      .finally(() => {
        setShowDeleteCardLoader(false);
      });
  }

  function handleShowMenu() {
    setShowTopMenu(true);
  }

  function handleHideMenu() {
    setShowTopMenu(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div
        className={`page${
          showTopMenu === undefined
            ? ''
            : showTopMenu
            ? ' rolling-down'
            : ' page_rolled_up rolling-up'
        }`}
      >
        <Header
          onShowMenu={handleShowMenu}
          onHideMenu={handleHideMenu}
          showTopMenu={showTopMenu}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDeleteClick}
            onCardLike={handleCardLike}
          />
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        showLoader={showEditProfileLoader}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        showLoader={showAddPlaceLoader}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        showLoader={showEditAvatarLoader}
      />
      <PopupWithForm
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        form={{
          name: 'confirm-delete',
          title: 'Вы уверены?',
          action: 'Да',
          loaderAction: 'Удаление',
          showLoader: showDeleteCardLoader,
          onSubmit: handleConfirmCardDelete,
        }}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        isSuccess={true}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
