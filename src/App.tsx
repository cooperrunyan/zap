import React, { useState } from 'react';

import { AppWrapper } from './components/AppWrapper/AppWrapper';
import { Settings } from './components/Settings/Settings';
import { Terminal } from './components/Terminal/Terminal';
// import { ToastContainer } from 'react-toastify';

export const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {/* <ToastContainer theme="dark" position="bottom-right" /> */}

      <AppWrapper>
        <Settings show={showSettings} hide={() => setShowSettings(false)} />
        <Terminal />
      </AppWrapper>
    </>
  );
};
