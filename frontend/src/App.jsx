import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import { Toaster } from 'react-hot-toast'
import useAuthUser from './hooks/useAuthUser.js'

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;


  return (
    <div className='h-screen' data-theme="dark">
      <Routes>
        <Route path='/' element={ isAuthenticated ? <HomePage /> : <SignUpPage />} />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <HomePage />} />
        <Route path='/login' element={ !isAuthenticated ? <LoginPage /> : <HomePage />} />
        <Route path="/notifications" element={ isAuthenticated ? <NotificationsPage /> : <LoginPage />} />
        <Route path='/call' element={ isAuthenticated ? <CallPage /> : <LoginPage />} />
        <Route path='/chat' element={ isAuthenticated ? <ChatPage /> : <LoginPage />} />
        <Route path='/onboarding' element={ isAuthenticated ? <OnboardingPage /> : <LoginPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App