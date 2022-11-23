import { ayu } from './themeStore/ayu';
import { github } from './themeStore/github';
import { nightOwl } from './themeStore/nightOwl';
import { nord } from './themeStore/nord';
import { oneDark } from './themeStore/oneDark';
import { synthwave } from './themeStore/synthwave';
import { tokyoNight } from './themeStore/tokyoNight';
import { zap } from './themeStore/zap';

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
