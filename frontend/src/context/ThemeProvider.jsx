import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
})

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('dark-mode')) ??
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState)
    localStorage.setItem('dark-mode', JSON.stringify(!isDarkMode))
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      setIsDarkMode(mediaQuery.matches)
    }
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
