import { request } from '_api/request';
import { handleSuccess, handleError } from '_utils/api';

export const postRegister = user =>
  request.post('/api/auth/register')
    .send(user)
    .then(handleSuccess)
    .catch(handleError);

export const postSettingsRegister = user =>
  request.post('/api/auth/settings')
    .send(user)
    .then(handleSuccess)
    .catch(handleError);


    export const postLogin = user =>
    request.post('/api/auth/login')
      .send(user)
      .then(handleSuccess)
      .catch(handleError);

export const postLogout = () =>
  request.post('/api/auth/logout')
    .then(handleSuccess)
    .catch(handleError);
