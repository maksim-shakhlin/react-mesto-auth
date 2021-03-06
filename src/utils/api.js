import { apiOptions } from './constants';

class ErrorWithCode extends Error {
  constructor(code = 500, message = '', ...args) {
    super(message, ...args);
    this.code = code;
  }
}
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(tag, method = 'GET', body) {
    const options = {
      method: method,
      headers: this._headers,
      credentials: 'include',
    };
    if (body) {
      Object.assign(options, { body: JSON.stringify(body) });
    }
    return fetch(this._baseUrl + tag, options).then((response) => {
      if (response.ok) {
        if (response.status !== 204) {
          return response.json();
        }
      } else {
        return Promise.reject(
          new ErrorWithCode(
            response.status,
            `Ошибка: ${response.status} (${response.statusText})`
          )
        );
      }
    });
  }

  getUser() {
    return this._request('/users/me');
  }

  getCards() {
    return this._request('/cards');
  }

  setUserInfo(data) {
    return this._request('/users/me', 'PATCH', data);
  }

  addCard(data) {
    return this._request('/cards', 'POST', data);
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, 'DELETE');
  }

  setAvatar(data) {
    return this._request('/users/me/avatar', 'PATCH', data);
  }

  changeLikeCardStatus(cardId, newStatus) {
    if (newStatus) {
      return this._request(`/cards/${cardId}/likes`, 'PUT');
    } else {
      return this._request(`/cards/${cardId}/likes`, 'DELETE');
    }
  }

  register(data) {
    return this._request('/signup', 'POST', data);
  }

  authorize(data) {
    return this._request('/signin', 'POST', data);
  }

  logout(data) {
    return this._request('/logout', 'POST', data);
  }
}

const api = new Api(apiOptions);

export default api;
