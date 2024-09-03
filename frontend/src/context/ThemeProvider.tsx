import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext<{
  isDarkMode: boolean
  toggleDarkMode: () => void
}>({
  isDarkMode: false,
  toggleDarkMode: () => undefined,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedPreference = localStorage.getItem('dark-mode')
    const prefersDarkScheme: boolean = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches

    return storedPreference ? !!JSON.parse(storedPreference) : prefersDarkScheme
  })

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
        className={`${isDarkMode ? 'dark' : 'light'} text-foreground bg-background relative min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
