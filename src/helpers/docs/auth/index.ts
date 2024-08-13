import create from './create';
import login from './login';

export default {
  '/v1/auth/create': {
    ...create,
  },
  '/v1/auth/login': {
    ...login,
  },
};