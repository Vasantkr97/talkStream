import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import { Toaster } from 'react-hot-toast'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'
import PageLoader from './components/PageLoader.jsx'

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore()
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  // const { data: authData, isLoading, error } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get("/auth/me");
  //     return res.data
  //   },
  //   retry: false,
  // });

  // const isAuthenticated = authData?.user;

  if (isLoading) return <PageLoader />


  return (
    <div className='' data-theme={theme}>
      <Routes>
        <Route 
          path='/' 
          element={ isAuthenticated && isOnboarded ? 
          ( <Layout showSidebar={true}> 
              <HomePage /> 
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ?
             "/login" : 
             "/onboarding"} />
            )
          } 
    
        />
        <Route 
          path='/signup' 
          element={ 
            !isAuthenticated ? 
            <SignUpPage /> : 
            <Navigate to={ 
              isOnboarded ? "/" : "/onboarding"} />
          } 
        />
        <Route 
          path='/login' 
          element={ 
            !isAuthenticated ? 
            <LoginPage /> : 
            <Navigate to={ isOnboarded ? "/" : "/onboarding"} />
            }
         />
        <Route 
          path="/notifications" 
          element={ 
            isAuthenticated && isOnboarded ? 
            (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
            )} />
        <Route 
          path='/call/:id' 
          element={ isAuthenticated && isOnboarded ? 
            <CallPage /> : 
            <Navigate to={
              !isAuthenticated ? 
              "/login" : "/onboarding"} /> } />
        <Route 
          path='/chat/:id' 
          element={ isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage /> 
              </Layout>
          ) : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />
        <Route 
          path='/onboarding' 
          element={ 
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App