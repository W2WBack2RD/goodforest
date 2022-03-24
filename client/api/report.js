import { request } from '_api/request';
import { handleSuccess, handleError } from '_utils/api';

export const postTreeReport = report =>
    request.post('/api/report/tree')
        .send(report)
        .then(handleSuccess)
        .catch(handleError);