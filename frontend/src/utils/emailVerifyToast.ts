import { emailVerify } from '@api/emailVerify'
import { RegisterRequest } from '@interfaces/user'
import { toast } from 'react-toastify'

const url = window.location.href.split('?')
const baseUrl = url[0]
const search = url[1] || ''

let verifiedUser: RegisterRequest | string

const notifyVerified = () =>
  toast.success(
    `${verifiedUser} was successfully verified! You can now log in with your email address and password.`,
  )

const notifyAlreadySent = () =>
  toast.warn(
    `${verifiedUser} is already verified. Please log in with your email address and password.`,
  )

if (search.includes('verify=')) {
  window.history.pushState('name', '', baseUrl)
  checkVerificationQuery()
}

async function checkVerificationQuery() {
  const jwtRegex = /[a-z\d]+\.[a-z\d]+\.[a-z\d]+/i
  if (jwtRegex.test(search)) {
    try {
      verifiedUser = await emailVerify(search.split('verify=')[1])

      if (verifiedUser) notifyVerified()
    } catch (error) {
      if (error instanceof Error) {
        verifiedUser = error.toString().split('Error: ')[1]
      }

      if (verifiedUser) notifyAlreadySent()
    }
  }
}
