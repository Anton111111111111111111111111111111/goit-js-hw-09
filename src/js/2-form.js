let formData = {
  email: '',
  message: '',
};

const formElem = document.querySelector('.feedback-form');
formElem.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  formData.email = email;
  formData.message = message;

  saveToLS('feedback-form-state', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback-form-state');
  try {
    formData = lsData;
    formElem.elements.email.value = lsData.email;
    formElem.elements.message.value = lsData.message;
  } catch (error) {
    console.log('Error');
  }
});

formElem.addEventListener('submit', e => {
  e.preventDefault();
  if (
    formElem.elements.email.value.trim() !== '' &&
    formElem.elements.message.value.trim() !== ''
  ) {
    console.log(formData);
  } else {
    console.log(`Input data`);
  }

  formElem.reset();
  localStorage.removeItem('feedback-form-state');
  formData = {
    email: '',
    message: '',
  };
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    return defaultValue || jsonData;
  }
}
