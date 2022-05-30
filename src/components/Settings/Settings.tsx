import React from 'react';
import style from './Settings.module.scss';

interface Props {
  show: boolean;
  hide: () => void;
}

export const Settings: React.FC<Props> = ({ show, hide }) => {
  return <>{show && <div className={style.Settings}>settings</div>}</>;
};
