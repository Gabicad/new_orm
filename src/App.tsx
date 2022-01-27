import * as React from 'react';
import AppThemeProvider from './Theme/AppThemeProvider';
import CustomDrawer from './Theme/Drawer';
import Content from './Theme/Content';
function AppContent() {
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
