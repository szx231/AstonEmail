import { Action, Middleware } from '@reduxjs/toolkit';
import axios from 'axios';

export const customMiddleware: Middleware = () => (next) => (action: Action<string>) => {
  if (action.type === 'signIn/SignInRequest/fulfilled') {
    axios.get('/api/logInformation').catch((error) => {
      console.log(error);
    });
  }
  return next(action);
};
