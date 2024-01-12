export function jwtParse(token: string) {
  const base64 = atob(token.split('.')[1]).toString();

  let decoded = {
    email: '',
  };

  try {
    decoded = JSON.parse(base64);
  } catch (error) {
    return undefined;
  }
  return decoded.email;
}
