import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

import CurrentUserContext from '../contexts/CurrentUserContext';

import { handleError, cleanData } from '../utils/utils';
import api from '../utils/api';
import auth from '../utils/auth';

function App() {
  const history = useHistory();
  const [showTopMenu, setShowTopMenu] = useState(undefined);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');

  const [isLoggedIn, setLoggedIn] = useState(false);

  function handleUpdateUser(data) {
    return api.setUserInfo(cleanData(data)).then((user) => {
      setCurrentUser(user);
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

  function handleUpdateAvatar(data) {
    return api.setAvatar(cleanData(data)).then((user) => {
      setCurrentUser(user);
    });
  }

  function handleAddPlace(place) {
    return api.addCard(cleanData(place)).then((card) => {
      setCards([card, ...cards]);
    });
  }

  function handleShowMenu() {
    setShowTopMenu(true);
  }

  function handleHideMenu() {
    setShowTopMenu(false);
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

  function handleLogin(data) {
    return auth.authorize(data).then((res) => {
      if (res.token) {
        validateToken(res.token);
      }
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

  function handleLogout() {
    setShowTopMenu();
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div
        className={classNames(
          'page',
          { 'rolling-down': showTopMenu },
          /* no extra classes when showTopMenu is undefined */
          { 'page_rolled_up rolling-up': showTopMenu === false }
        )}
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
            setCards={setCards}
            onCardLike={handleCardLike}
            onUpdateUser={handleUpdateUser}
            onUpdateAvatar={handleUpdateAvatar}
            onAddPlace={handleAddPlace}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
