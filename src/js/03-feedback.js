import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name="email"]'),
  messageTextarea: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.emailInput.addEventListener('input', throttle(onEmailInput, 500));
refs.messageTextarea.addEventListener('input', throttle(onMessageInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  console.log('submit');
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onEmailInput(e) {
  const email = e.target.value;
  localStorage.setItem(STORAGE_KEY, email);
}

function onMessageInput(e) {
  const message = e.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    refs.messageTextarea.value = savedMessage;
  }
}
