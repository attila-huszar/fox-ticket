export const validateName = (name: string) => {
  const nameRegex = /^([A-ZÀ-ű]([-.,' ])?){1,254}$/i;
  return nameRegex.test(name);
};

export const validateEmail = (email: string) => {
  const emailRegex =
    /^\w+([-+_.!#$%&*=]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
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
