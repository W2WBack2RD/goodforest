import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';


export const getUser = () =>
  request.get('/api/user')
    .then(handleSuccess)
    .catch(handleError);

export const putUser = info =>
  request.put('/api/user')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const putUserPassword = passwordInfo =>
  request.put('/api/user/password')
    .send(passwordInfo)
    .then(handleSuccess)
    .catch(handleError);

<<<<<<< HEAD

=======
>>>>>>> 1a08c3e38a1387a8e702fda8e1b56970efda011a
export const getExample = () =>
  request.get('/api/example/')
    .send()
    .then()
<<<<<<< HEAD
    .catch();
=======
    .catch();
>>>>>>> 1a08c3e38a1387a8e702fda8e1b56970efda011a
