const regExEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExPassword = /^[a-zA-Z0-9]+$/;

export enum validateRulesText {
  email = 'Пожалуйста, введите корректный e-mail',
  requiredField = 'Обяательное поле',
  minLengthPass = 'Пароль не меньше 7 символов',
  maxLengthPass = 'Пароль не меньше 30 символов',
  password = 'Пароль может состоять только из букв и цифр',
}

export enum placeholderText {
  email = 'Введите ваш почтовый ящик',
  password = 'Введите ваш пароль',
}

export const validateRules = {
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
