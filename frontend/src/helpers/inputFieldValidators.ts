export const validateName = (name: string) => {
  const nameRegex = /^(?:[A-Z\u00C0-\u017E][-.,' ]?){1,254}$/i;
  return nameRegex.test(name);
};

export const validateEmail = (email: string) => {
  const emailRegex =
    /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z\d-]+\.)+[A-Z]{2,6}$/i;
  if (email.length > 4 && email.length < 255) {
    return emailRegex.test(email);
  } else {
    return false;
  }
};

export const validatePassword = (password: string) => {
  const passwordRegex = /\S{8,254}/;
  return passwordRegex.test(password);
};

export const validateMatch = (password: string, passwordConf: string) => {
  if (password === passwordConf) {
    return true;
  } else {
    return false;
  }
};
