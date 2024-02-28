import { userVerify } from '@api/userVerify'
import { toast } from 'react-toastify'

const url = window.location.href.split('?')
const verificationString = url[1] || ''
const baseUrl = url[0]

if (verificationString.includes('verify=')) {
  window.history.pushState('name', '', baseUrl)
  emailVerify()
}

async function emailVerify() {
  try {
    const userData = await userVerify(verificationString.split('verify=')[1])

    if (userData.isVerified) {
      toast.success(
        `${userData.name} successfully verified! You can now log in with your email address and password.`,
      )
    } else if (userData.message === 'Already verified') {
      toast.warn(
        `${userData.email} is already verified! Please log in with your email address and password.`,
      )
    } else if (userData.message === 'Token is expired or invalid') {
      toast.warn(
        'Your verification link has expired. Please request a new verification link.',
      )
    } else {
      toast.error('Something went wrong. Please try again later.')
    }
  } catch {
    toast.error('Something went wrong. Please try again later.')
  }
}
