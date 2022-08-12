import React, { useEffect, useState } from 'react';

import { AppWrapper } from './components/AppWrapper/AppWrapper';
import { Terminal } from './components/Terminal/Terminal';
// import { ToastContainer } from 'react-toastify';

export const App: React.FC = () => {
  return (
    <>
      {/* <ToastContainer theme="dark" position="bottom-right" /> */}

      <AppWrapper>
        <Terminal />
      </AppWrapper>
    </>
  );
};
