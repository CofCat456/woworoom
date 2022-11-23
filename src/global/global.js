// 換算金錢
export function currency(val, symbol) {
  const arr = val.toString().split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return symbol + arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
}

// 計算總和
export function calcSum(price, quantity) {
  return price * quantity;
}

export default {};
