const authOptions = {
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
};

class ErrorWithCode extends Error {
  constructor(code = 500, message = '', ...args) {
    super(message, ...args);
    this.code = code;
  }
}

class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(tag, method, data = { headers: {}, body: {} }) {
    if (!method) {
      method = 'GET';
    }
    const options = {
      method: method,
      headers: Object.assign(this._headers, data.headers),
    };

    if (data.body) {
      Object.assign(options, { body: JSON.stringify(data.body) });
    }

    return fetch(this._baseUrl + tag, options).then((response) => {
      if (response.ok) {
        return response.json();
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

  register(data) {
    return this._request('/signup', 'POST', { body: data });
  }

  authorize(data) {
    return this._request('/signin', 'POST', { body: data });
  }

  checkToken(token) {
    return this._request('/users/me', 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const auth = new Auth(authOptions);

export default auth;
