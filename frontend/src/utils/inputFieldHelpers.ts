import {
  validateName,
  validateEmail,
  validatePassword,
  validateMatch,
} from '@utils/inputFieldValidators'

export function nameHelper(name: string): InputField {
  if (!name.trim())
    return {
      text: '',
      color: 'default',
    }
  const isValid = validateName(name)

  return {
    text: isValid ? 'Valid name' : 'Character not allowed',
    color: isValid ? 'success' : 'warning',
  }
}

export function emailHelper(email: string): InputField {
  if (!email.trim())
    return {
      text: '',
      color: 'default',
    }
  const isValid = validateEmail(email)

  return {
    text: isValid ? 'Valid email' : 'Please enter a valid email address',
    color: isValid ? 'success' : 'warning',
  }
}

export function passHelper(password: string): InputField {
  if (!password)
    return {
      text: '',
      color: 'default',
    }
  const isValidPass = validatePassword(password)

  return {
    text: isValidPass
      ? 'Valid password'
      : 'Please enter minimum eight characters',
    color: isValidPass ? 'success' : 'warning',
  }
}

export function passMatchHelper(pass: string, passConf: string): InputField {
  if (!passConf)
    return {
      text: '',
      color: 'default',
    }

  const isValidPass = validatePassword(passConf)
  const isMatching = validateMatch(pass, passConf)

  return {
    text: isMatching ? 'Passwords match' : 'Passwords do not match',
    color: isValidPass && isMatching ? 'success' : 'warning',
  }
}

interface InputField {
  text: string
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
}
