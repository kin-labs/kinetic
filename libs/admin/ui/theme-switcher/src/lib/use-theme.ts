import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

export function useTheme(): {
  theme: Theme
  toggleTheme: () => void
} {
  const [theme, setTheme] = useState<Theme>('light')

  function toggleTheme() {
    if (theme === 'light') {
      document?.querySelector('html')?.setAttribute('data-theme', 'dark')
      setTheme('dark')
    } else {
      document?.querySelector('html')?.setAttribute('data-theme', 'light')
      setTheme('light')
    }
  }

  useEffect(() => {
    const prefersDark = window?.matchMedia ? window?.matchMedia('(prefers-color-scheme: dark)').matches : false
    if (prefersDark) {
      toggleTheme()
    }
  }, [])

  return { theme, toggleTheme }
}
