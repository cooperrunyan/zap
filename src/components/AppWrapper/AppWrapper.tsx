import React from 'react';
import style from './AppWrapper.module.scss';

interface Props {
  children?: React.ReactElement | React.ReactElement[];
}

export const AppWrapper: React.FC<Props> = ({ children }) => {
  const settings = window.electron.api.settings.get();
  return (
    <div className={style.App}>
      {!settings.window.useNativeAppBar ? <div className={style.App_Bar}></div> : <></>}
      <div className={style.App_Content + ' ' + (settings.window.useNativeAppBar ? style.native : '')}>{children}</div>
    </div>
  );
};
