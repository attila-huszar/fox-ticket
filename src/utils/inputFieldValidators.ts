export const validateEmail = (value: string) => {
  const regex = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value);
};

export const validatePass = (value: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,128}$/;
  return regex.test(value);
};
