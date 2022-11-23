import { productPath, shoppingCartPath } from './constants.js';

export const fetchProductList = () => fetch(productPath);
export const fetchShoppingCart = () => fetch(shoppingCartPath);
