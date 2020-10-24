import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

import CurrentUserContext from '../contexts/CurrentUserContext';

import { handleError, cleanData } from '../utils/utils';
import api from '../utils/api';
import { userStateEnum } from './../utils/constants';

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(userStateEnum.UNSET);
  const [cards, setCards] = useState([]);

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

  function getData() {
    Promise.all([api.getUser(), api.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
        history.push('/');
      })
      .catch((error) => {
        handleError(error);
        if (error.code === 401) {
          setCurrentUser(userStateEnum.NONE);
        } else {
          setCurrentUser(userStateEnum.ERROR);
        }
      });
  }

  function handleLogin(data) {
    setCurrentUser(userStateEnum.CAST);
    return api.authorize(cleanData(data)).then(() => {
      getData();
    });
  }

  useEffect(() => {
    getData();
  }, []);

  function handleLogout() {
    api
      .logout({ _id: currentUser._id })
      .then(() => setCurrentUser(userStateEnum.NONE))
      .catch((error) => {
        handleError(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout} />
        <Switch>
          <ProtectedRoute
            value={currentUser}
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
          <ProtectedRoute
            value={currentUser}
            path="/sign-in"
            shouldRedirect={false}
            component={Login}
            onLogin={handleLogin}
          />
          <ProtectedRoute
            value={currentUser}
            path="/sign-up"
            shouldRedirect={false}
            component={Register}
          />
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
