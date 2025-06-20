import React from 'react'
import { useThemeStore } from '../store/useThemeStore'

const NotificationsPage = () => {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      NotificationsPage
    </div>
  )
}

export default NotificationsPage