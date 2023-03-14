const regExEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExName = /^[a-zA-Zа-яА-Я]+$/;
const regExPassword = /^[a-zA-Z0-9]+$/;

export enum validateRulesText {
  name = 'Только буквы',
  surname = 'Только буквы',
  email = 'Не верный формат, пример - example@gmail.ru',
  password = 'Пароль может состоять только из букв и цифр',
  minLengthPass = 'Пароль не меньше 7 символов',
  maxLengthPass = 'Пароль не меньше 30 символов',
  minLengthName = 'Имя не меньше 2 символов',
  maxLengthName = 'Имя не больше 15 символов',
  minLengthSurname = 'Фамилия не меньше 2 символов',
  maxLengthSurname = 'Фамилия не больше 20 символов',
  requiredField = 'Обязательное поле!',
}

export enum placeholderText {
  name = 'Ваше Имя',
  surname = 'Ваша Фамилия',
  email = 'Введите желаемую почту',
  password = 'Введите пароль',
  checkPassword = 'Подтвердите пароль',
}

export const roleOptions = [
  {
    value: 'user',
    label: 'user',
  },
  {
    value: 'admin',
    label: 'admin',
  },
];

export const validateRules = {
  name: {
    required: true,
    pattern: {
      value: regExName,
      message: validateRulesText.name,
    },
    minLength: {
      value: 2,
      message: validateRulesText.minLengthName,
    },
    maxLength: {
      value: 15,
      message: validateRulesText.maxLengthName,
    },
  },
  surname: {
    required: true,
    pattern: {
      value: regExName,
      message: validateRulesText.surname,
    },
    minLength: {
      value: 2,
      message: validateRulesText.minLengthSurname,
    },
    maxLength: {
      value: 20,
      message: validateRulesText.maxLengthSurname,
    },
  },
  email: {
    required: true,
    pattern: {
      value: regExEmail,
      message: validateRulesText.email,
    },
  },
  password: {
    required: true,
    pattern: {
      value: regExPassword,
      message: validateRulesText.password,
    },
    minLength: {
      value: 7,
      message: validateRulesText.minLengthPass,
    },
    maxLength: {
      value: 30,
      message: validateRulesText.maxLengthPass,
    },
  },
};
