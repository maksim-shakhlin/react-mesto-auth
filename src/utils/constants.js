import succesIcon from '../images/tooltip/success.svg';
import failureIcon from '../images/tooltip/failure.svg';

export const errorsDictionaries = {
  profile: {
    name: {
      tooShort: 'От 2 до 40 значащих символов.',
      patternMismatch: 'Можно только буквы, пробелы и дефисы.',
    },
    about: { tooShort: 'От 2 до 200 значащих символов.' },
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'a4f46b18-7de7-442e-8bbc-f01266820d43',
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
];

export const status = {
  UNSET: 0,
  REGISTERED: 1,
  REGISTRATION_FAIL: 2,
  NO_USER: 3,
};
