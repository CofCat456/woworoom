import { apiProductPath, apiShopCartPath } from './constants.js';

const optionBase = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const fetchRequest = (method, apiPath, data) => {
  const param = {
    ...optionBase,
    method,
  };
  if (method === 'POST') param.body = JSON.stringify(data);

  return fetch(apiPath, param);
};

export const getProductApi = () => fetch(apiProductPath);

export const getShopCartApi = () => fetch(apiShopCartPath);

export const addShopCartApi = (data) => fetchRequest('POST', apiShopCartPath, data);

// --------------- Customer ---------------
