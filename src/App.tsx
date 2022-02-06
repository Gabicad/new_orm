import * as React from 'react';
import AppThemeProvider from './Theme/AppThemeProvider';
import CustomDrawer from './Theme/Drawer';
import Content from './Theme/Content';
import { useStoreon } from 'storeon/react';
import { AuthEvents, IAuthUser } from './store/core/AuthStore';
import Login from './pages/login';
function AppContent() {
  const { loggedIn } = useStoreon<IAuthUser, AuthEvents>('loggedIn');

  if (!loggedIn) {
    return (
      <AppThemeProvider>
        <Login />
      </AppThemeProvider>
    );
  }

  return (
    <AppThemeProvider>
      <CustomDrawer>
        <Content />
      </CustomDrawer>
    </AppThemeProvider>
  );
}

export default function App() {
  return <AppContent />;
}
