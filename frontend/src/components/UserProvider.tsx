import { createContext, useEffect, useState } from 'react';
import { LoggedInUser } from '../interfaces/user';

const defaultUser = {
  name: 'Guest',
  email: 'visitor',
  token: '',
  isAdmin: false,
};
export const UserContext = createContext(defaultUser);

export default function UserProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<LoggedInUser>(defaultUser);

  useEffect(() => {
    const user = {
      name: localStorage.getItem('name') || 'Guest',
      email: localStorage.getItem('email') || 'visitor',
      token: localStorage.getItem('token') || '',
      isAdmin: Boolean(localStorage.getItem('admin')) || false,
    };

    setCurrentUser(user);
  }, []);
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}
