import { request } from '_api/request';
import { handleSuccess, handleError } from '_utils/api';

export const postCheckUsername = username =>
  request.post('/api/users/checkusername')
    .send({ username })
    .then(handleSuccess)
    .catch(handleError);
