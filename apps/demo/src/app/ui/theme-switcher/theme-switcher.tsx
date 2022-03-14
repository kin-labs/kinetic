import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useTheme } from './use-theme'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  const toggle = () => {
    toggleTheme()
  }

  return (
    <button onClick={toggle} className="btn btn-ghost">
      {theme === 'dark' ? (
        <SunIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  )
}
