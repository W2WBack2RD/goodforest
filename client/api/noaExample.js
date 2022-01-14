import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

var msg = '';

export const getNoaWelcoming = () =>
    request.get('/api/noaExample')
        .then((res) => {
            const msg = res.text;
            alert(msg);
        })
        .catch(handleError);

export default msg;