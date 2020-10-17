import { apiOptions } from './constants';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(tag, method = 'GET', body) {
    const options = { method: method, headers: this._headers };
    if (body) {
      Object.assign(options, { body: JSON.stringify(body) });
    }
    return fetch(this._baseUrl + tag, options).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          new Error(`Ошибка: ${response.status} (${response.statusText})`)
        );
      }
    });
  }

  getUser() {
    return this._request('/users/me');
  }

  getInitialCards() {
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
      return this._request(`/cards/likes/${cardId}`, 'PUT');
    } else {
      return this._request(`/cards/likes/${cardId}`, 'DELETE');
    }
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

const api = new Api(apiOptions);

export default api;
