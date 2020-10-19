import succesIcon from '../images/tooltip/success.svg';
import failureIcon from '../images/tooltip/failure.svg';

export const errorsDictionaries = {
  profile: {
    name: {
      tooShort: 'От 2 до 30 значащих символов.',
      patternMismatch: 'Можно только буквы, пробелы и дефисы.',
    },
    about: { tooShort: 'От 2 до 30 значащих символов.' },
  },
  auth: {
    password: {
      patternMismatch: 'Можно латинские буквы, цифры и спецсимволы.',
      tooShort: 'Минимум 6 символов.',
    },
  },

  place: {
    name: {
      tooShort: 'От 2 до 30 значащих символов.',
    },
  },
  default: {
    valueMissing: 'Это обязательное поле.',
    typeMismatch: {
      email: 'Невалидный email.',
      url: 'Это должна быть ссылка.',
      default: 'Данные не соответсвуют нужному типу.',
    },
  },
};

export const apiOptions = {
  baseUrl: 'https://api.maks.students.nomoreparties.xyz',
  // baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const delay = 150;

export const statuses = [
  {},
  { icon: succesIcon, alt: 'OK', text: 'Вы успешно зарегистрировались!' },
  {
    icon: failureIcon,
    alt: 'Неудача',
    text: 'Что-то пошло не так! Попробуйте ещё раз.',
  },
  {
    icon: failureIcon,
    alt: 'Пользователь не найден',
    text: 'Неправильный email или\xa0пароль.',
  },
  {
    icon: failureIcon,
    alt: 'Неудача',
    text: 'Что-то пошло не так! Попробуйте позже.',
  },
];

export const statusEnum = {
  UNSET: 0,
  REGISTERED: 1,
  REGISTRATION_FAIL: 2,
  NO_USER: 3,
  COMMON_FAIL: 4,
};
Object.freeze(statusEnum);

export const menuStateEnum = {
  UNSET: 0,
  SHOWN: 1,
  HIDDEN: 2,
};
Object.freeze(menuStateEnum);

export const userStateEnum = {
  NONE: null, // not authorized
  UNSET: undefined, // at app start
  ERROR: false, // failed to get data
  CAST: 0, // after login, before getUser
};
Object.freeze(userStateEnum);
