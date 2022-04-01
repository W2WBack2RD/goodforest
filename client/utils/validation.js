import R from 'ramda';

export const validateUsername = username => {
  let valid = true;
  let message = 'יוזר תקין';

  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  if (username.match(validRegex)) {
    message = 'כתובת מייל לא תקינה';
    valid = true;
  }
  else {
    message = 'כתובת מייל לא תקינה';
    valid = false;
  }
  return { valid, message };
};

export const validatePassword = (username, password) => {
  let valid = true;
  let message = 'סיסמא תקינה';

  if (R.match(/[a-zA-Z]/g, password).length < 7) {
    valid = false;
    message = 'לפחות 8 תווים, לפחות ספרה אחת';
  } else if (!R.match(/[0-9]/, password).length) {
    valid = false;
    message = 'לפחות 8 תווים, לפחות ספרה אחת';
  }
  else {
    valid = true;
    message = 'סיסמה תקינה';
  }

  return { valid, message };
};

export const validateName = name => {
  if (name === '') {
    return true;
  }
  if (!R.match(/^[a-zA-ZÀ-ÿ'.\s]+$/, name).length) {
    return false;
  }
  if (name.length > 20) {
    return false;
  }
  return true;
};
