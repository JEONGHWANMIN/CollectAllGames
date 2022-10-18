/* eslint-disable no-useless-escape */
function emailValidate(email: string) {
  const reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (email.length >= 5) {
    if (reg.test(email) === false) {
      return true;
    }
  }
  return false;
}

function passwordValidate(password: string) {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (reg.test(password) === false) {
    return true;
  }
  return false;
}

function passwordConfirmValidate(password: string, passwordConfirm: string) {
  if (password !== passwordConfirm) {
    return true;
  }
  return false;
}

function userNameValidate(username: string) {
  const reg = /\s/g;
  if (reg.test(username)) {
    return true;
  }
  return false;
}

export const validateService = {
  emailValidate,
  passwordValidate,
  passwordConfirmValidate,
  userNameValidate,
};
