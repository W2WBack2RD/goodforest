import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const getExample = () =>
  request.get('/api/example')
    .then(handleSuccess)
    .catch(handleError);


