import R from 'ramda';

export const validateUsername = username => {
  let valid = true;
  let message = 'Username Valid';

  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  if (username.match(validRegex)) {
    message = 'Valide email address';
    valid = true;
  }
  else {
    message = 'כתובת מייל לא תקינה';
    valid = false;
  }
  // } else if (username.length < 4) {
  //   message = 'Username must be at least four characters';
  //   valid = false;
  // } else if (username.length > 20) {
  //   message = 'Username must be 20 characters or less';
  //   valid = false;
  // } else if (R.match(/[a-zA-Z]/g, username).length < 4) {
  //   message = 'Username must include at least four letters';
  //   valid = false;
  // }

  return { valid, message };
};

export const validatePassword = (username, password) => {
  let valid = true;
  let message = 'Password valid';

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
