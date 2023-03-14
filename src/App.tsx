import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import { ErrorBoundary } from 'react-error-boundary';
import { Layout } from './components/Layout';
import { ThemingProvider } from './components/Context/Theme';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
import { AuthorizationProvider } from './components/Context/Auth';
import { FeatureFlagProvider } from './components/Context/FeatureFlag';
import { ErrFallBackMessage } from './components/ErrFallBackMessage';

const Mail = React.lazy(() => import(/* webpackChunkName: "Messages" */ './pages/Mail'));
const CurrentMessage = React.lazy(() => import(/* webpackChunkName: "Message" */ './pages/CurrentMessage'));
const SignIn = React.lazy(() => import(/* webpackChunkName: "SignIn " */ './pages/Authorization/SignIn'));
const SignUp = React.lazy(() => import(/* webpackChunkName: "SignUp" */ './pages/Authorization/SignUp'));
const AdminPanel = React.lazy(() => import(/* webpackChunkName: "AdminPanel" */ './pages/AdminPanel'));
const FavoriteMessage = React.lazy(() => import(/* webpackChunkName: "FavoriteMessage" */ './pages/FavoriteMessage'));

const App = () => {
  return (
    <ThemingProvider>
      <Suspense fallback={<TopBarProgress />}>
        <AuthorizationProvider>
          <FeatureFlagProvider>
            <Routes>
              <Route path="/Authorization/SignIn" element={<SignIn />} />
              <Route path="/Authorization/SignUp" element={<SignUp />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Layout />}>
                  <Route
                    path="/Mail"
                    element={
                      <ErrorBoundary fallback={<ErrFallBackMessage />}>
                        <Mail />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/adminPanel"
                    element={
                      <ErrorBoundary fallback={<ErrFallBackMessage />}>
                        <AdminPanel />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/favoriteMessage"
                    element={
                      <ErrorBoundary fallback={<ErrFallBackMessage />}>
                        <FavoriteMessage />
                      </ErrorBoundary>
                    }
                  />
                  <Route path="/favoriteMessage/:Mail/:message/*" element={<CurrentMessage />} />
                  <Route path="/Mail/:category/:message/*" element={<CurrentMessage />} />
                </Route>
              </Route>
            </Routes>
          </FeatureFlagProvider>
        </AuthorizationProvider>
      </Suspense>
    </ThemingProvider>
  );
};

export default App;
