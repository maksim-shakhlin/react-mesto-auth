import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
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
import { delay, status, statuses } from '../utils/constants';
import api from '../utils/api';
import auth from '../utils/auth';
import { cleanData } from './../utils/utils';

function App() {
  const history = useHistory();
  const [showTopMenu, setShowTopMenu] = useState();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(status.UNSET);
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [email, setEmail] = useState('');

  const [showAddPlaceLoader, setShowAddPlaceLoader] = useState(false);
  const [showEditAvatarLoader, setShowEditAvatarLoader] = useState(false);
  const [showEditProfileLoader, setShowEditProfileLoader] = useState(false);
  const [showDeleteCardLoader, setShowDeleteCardLoader] = useState(false);
  const [showLoginLoader, setShowLoginLoader] = useState(false);
  const [showRegistrationLoader, setShowRegistrationLoader] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);

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

  function handleCloseTooltip() {
    if (tooltipStatus === status.REGISTERED) {
      history.push('/sign-in');
    }
    setTooltipOpen(false);
  }

  function getData() {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => handleError(error));
  }

  function validateToken(token) {
    auth
      .checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.data.email);
        localStorage.setItem('jwt', token);
        history.push('/');
      })
      .catch((error) => {
        if (error.code === 401) {
          localStorage.removeItem('jwt');
          return;
        }
        handleError(error);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      validateToken(jwt);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  function handleRegister(data) {
    setShowRegistrationLoader(true);
    auth
      .register(data)
      .then(() => {
        setTooltipStatus(status.REGISTERED);
        setTooltipOpen(true);
      })
      .catch((error) => {
        handleError(error);
        setTooltipStatus(status.REGISTRATION_FAIL);
        setTooltipOpen(true);
      })
      .finally(() => {
        setShowRegistrationLoader(false);
      });
  }

  function handleLogin(data) {
    setShowLoginLoader(true);
    auth
      .authorize(data)
      .then((res) => {
        if (res.token) {
          validateToken(res.token);
        }
      })
      .catch((error) => {
        handleError(error);
        if (error.code === 401) {
          setTooltipStatus(status.NO_USER);
          setTooltipOpen(true);
        }
      })
      .finally(() => {
        setShowLoginLoader(false);
      });
  }

  function handleLogout() {
    setShowTopMenu();
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('jwt');
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
          onLogout={handleLogout}
          email={email}
        />
        <Switch>
          <ProtectedRoute
            condition={isLoggedIn}
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
            <Login showLoader={showLoginLoader} onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register
              showLoader={showRegistrationLoader}
              onRegister={handleRegister}
            />
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
        onClose={handleCloseTooltip}
        status={statuses[tooltipStatus]}
        isOpen={isTooltipOpen}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
