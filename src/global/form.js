import validate from 'validate.js';

import { formItemData } from './mockData';

const form = document.querySelector('#main');

const formInputs = document.querySelectorAll('#main input, #main select');

let errors = [];

function closestParent(child, className) {
  if (!child || child === document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  }
  return closestParent(child.parentNode, className);
}

function showErrorsForInput(input, error) {
  const formGroup = closestParent(input.parentNode, 'form-group');
  const errorMsg = formGroup.querySelector('.error-msg');
  if (error) {
    errorMsg.textContent = error.join(', ');
  } else {
    errorMsg.textContent = '';
  }
}

function checkData() {
  errors = validate(form, formItemData) || '';
  showErrorsForInput(this, errors[this.name]);
}

formInputs.forEach((item) => {
  item.addEventListener('change', checkData);
});

function showErrors() {
  formInputs.forEach((item) => {
    showErrorsForInput(item, errors[item.name]);
  });
}

function handleFormSubmit() {
  errors = validate(form, formItemData);

  if (errors) {
    showErrors();
  }

  console.log('yes');
}

function submitData(event) {
  event.preventDefault();
  handleFormSubmit(form);
}

form.addEventListener('submit', submitData);
