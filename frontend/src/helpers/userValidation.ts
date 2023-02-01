export const validateEmail = (email: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const validatePass = (password: string) => {
  const passwordRegex = /.{8,255}/;
  return passwordRegex.test(password);
};

export const validateName = (name: string) => {
  const nameRegex = /([A-ZÀ-ű][ -,.']?){1,255}/i
  return nameRegex.test(name)
};
