import validate from 'validate.js';

import { formItemData } from './mockData';
import { addOrderApi } from './fetchApi';
import { callSwal, isReject } from './global';

const form = document.querySelector('#main');

const formInputs = document.querySelectorAll('#main input, #main select');
const formSubBtn = document.querySelector('.form-subBtn');

let errors = [];

const addOrder = async (user) => {
  const Loading = formSubBtn.children[0];

  try {
    Loading.classList.remove('hidden');
    const res = await addOrderApi(user);
    const data = await res.json();
    const { status, message = '' } = data;
    Loading.classList.add('hidden');
    if (isReject(status)) {
      callSwal({
        status,
        title: '新增訂單失敗 (′゜ω。‵)',
        msg: message,
      });
      return;
    }
    callSwal({
      status,
      title: '新增訂單成功 ⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾',
    });
  } catch (err) {
    console.log(err);
  }
};

// --------------- 新增訂單  ---------------

function closestParent(child, className) {
  if (!child || child === document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  }
  return closestParent(child.parentNode, className);
}

// --------------- 找尋距離 input 最近的 errorMsg Dom  ---------------

function showErrorsForInput(input, error) {
  const formGroup = closestParent(input.parentNode, 'form-group');
  const errorMsg = formGroup.querySelector('.error-msg');
  if (error) {
    errorMsg.textContent = error.join(', ');
  } else {
    errorMsg.textContent = '';
  }
}

// --------------- 將錯誤顯示在 input 上 ---------------

function checkData() {
  errors = validate(form, formItemData) || '';
  showErrorsForInput(this, errors[this.name]);
}

// --------------- inputs 值改變時，立即檢查錯誤 ---------------

formInputs.forEach((item) => {
  item.addEventListener('change', checkData);
});

// --------------- 監聽 inputs 改變 ---------------

function showErrors() {
  formInputs.forEach((item) => {
    showErrorsForInput(item, errors[item.name]);
  });
}

// --------------- 將每個 input 跟 error 傳遞出去 ---------------

function handleFormSubmit() {
  const user = {};
  errors = validate(form, formItemData);

  if (errors) {
    showErrors();
    return;
  }

  formInputs.forEach((item) => {
    user[item.name] = item.value;
  });

  addOrder({
    data: {
      user,
    },
  });
}

// --------------- 檢查送出資料 ---------------

function submitData(event) {
  event.preventDefault();
  handleFormSubmit();
}

// --------------- 表單送出資料 ---------------

form.addEventListener('submit', submitData);

// --------------- 表單送出事件  ---------------
