import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('dark-mode')!) ??
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  const toggleDarkMode = () => {
    setIsDarkMode((prevState: boolean) => !prevState)
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
      <div
        className={`${isDarkMode ? 'dark' : 'light'} text-foreground bg-background min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
