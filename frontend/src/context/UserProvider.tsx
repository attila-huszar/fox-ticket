import { createContext, useState } from 'react'
import { IUserContext, UserResponse } from '@interfaces/user'

const defaultUser: UserResponse = {
  name: 'Guest',
  email: '',
  token: '',
}

export const UserContext = createContext<IUserContext>({
  user: defaultUser,
  setUser: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    name: localStorage.getItem('name') ?? defaultUser.name,
    email: localStorage.getItem('email') ?? defaultUser.email,
    token: localStorage.getItem('token') ?? defaultUser.token,
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
