import { FC } from 'react';
import s from './inputErrorMessage.module.css';
import { validateRulesText } from '../../../pages/Authorization/SignUp/validateRules';

interface ErrorsObject {
  type: string;
  ref?: {};
  message: string;
}

interface Err {
  errors: ErrorsObject;
}

export const InputErrorMessage: FC<Err> = ({ errors }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {errors && (
        <span
          className={s.error}
          style={{
            opacity: errors && 1,
          }}
        >
          {errors.message || validateRulesText.requiredField}
        </span>
      )}
    </>
  );
};
