import React from 'react'
import { useThemeStore } from '../store/useThemeStore'

const HomePage = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme}>HomePage</div>
  )
}

export default HomePage