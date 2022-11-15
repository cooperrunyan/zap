import { ayu } from './themes/ayu';
import { github } from './themes/github';
import { nightOwl } from './themes/nightOwl';
import { nord } from './themes/nord';
import { oneDark } from './themes/oneDark';
import { synthwave } from './themes/synthwave';
import { tokyoNight } from './themes/tokyoNight';
import { zap } from './themes/zap';

const themeMap = {
  ayu,
  github,
  'night-owl': nightOwl,
  nord,
  'one-dark': oneDark,
  synthwave,
  'tokyo-night': tokyoNight,
  zap
};

type ThemeString<T extends string> = T extends `${infer J}Theme` ? J : T;

export function theme(name: ThemeString<keyof typeof themeMap>) {
  return themeMap[name];
}
