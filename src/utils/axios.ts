import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';

import { refreshSession } from '../store/auth/authSlice';
import state from '../store/index';

const axiosInstance = axios.create();

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

axiosInstance.interceptors.response.use(undefined, (err) => {
  const { config } = err;
  const status = err.response ? err.response.status : null;

  if (!config) {
    return Promise.reject(err);
  }
  if (!config.retry) {
    config.retry = 3;
  }

  config.retry -= 1;
  if (config.retry <= 0) {
    return Promise.reject(err);
  }

  if (status == 401) {
    return state
      .dispatch(refreshSession())
      .then(unwrapResult)
      .then((r) => {
        const token = r.AccessToken;
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      })
      .then(() => axiosInstance(config));
  } else {
    return sleep(config.retryDelay || 500).then(() => axiosInstance(config));
  }
});

export { axiosInstance };
