import api from './index';

export default {
  login(data) {
    return api().post('/login', data, { errorHandle: false });
  },
};
