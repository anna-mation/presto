import axios from 'axios';
import { BACKEND_PORT } from './constants';

export const setDataStore = (store, setErrorMsg, token) => {
  return new Promise((resolve) => {
    axios
      .put(
        `http://localhost:${BACKEND_PORT}/store`,
        {
          store
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(resolve)
      .catch((err) => {
        setErrorMsg(err.response.data.error);
      });
  });
};

export const getDataStore = (setErrorMsg, token) => {
  return new Promise((resolve) => {
    axios
      .get(`http://localhost:${BACKEND_PORT}/store`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => resolve(res.data.store))
      .catch((err) => {
        setErrorMsg(err.response.data.error);
      });
  });
};

/**
 * checks if url is valid image, referenced from https://www.zhenghao.io/posts/verify-image-url
 */
export const checkImage = (url) => {
  if (!url) return true;
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};
