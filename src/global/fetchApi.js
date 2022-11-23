import { apiProductPath, apiShopCartPath } from './constants.js';

export const getProductApi = () => fetch(apiProductPath);
export const getShopCartApi = () => fetch(apiShopCartPath);

// --------------- Customer ---------------
