const authorize = 'cofcat';

const apiCustomerPath = `https://livejs-api.hexschool.io/api/livejs/v1/customer/${authorize}`;

export const apiProductPath = `${apiCustomerPath}/products`;
export const apiShopCartPath = `${apiCustomerPath}/carts`;
export const apiOrdersPath = `${apiCustomerPath}/orders`;
