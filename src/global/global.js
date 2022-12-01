import Swal from 'sweetalert2';

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

export function callSwal(info) {
  const { status, title, msg = '', timer = 1500 } = info;
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    icon: status ? 'success' : 'error',
    title,
    text: msg !== '' ? msg : '',
  });
}

export const isReject = (status) => status === false;

export default {};
