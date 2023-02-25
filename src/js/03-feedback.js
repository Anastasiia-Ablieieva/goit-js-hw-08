import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
let formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;
  console.log({ email: email.value, message: message.value });

  if (localStorage.getItem(STORAGE_KEY)) {
    localStorage.removeItem(STORAGE_KEY);
  }
  e.currentTarget.reset();
  formData = {};
}

function populateForm() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  formData = JSON.parse(data);
  refs.input.value = formData.email || '';
  refs.textarea.value = formData.message || '';
}
