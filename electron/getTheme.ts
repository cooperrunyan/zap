import { andromeda } from './themes/andromeda';
import { ayu } from './themes/ayu';
import { dracula } from './themes/dracula';
import { github } from './themes/github';
import { monokai } from './themes/monokai';
import { nightOwl } from './themes/nightOwl';
import { nord } from './themes/nord';
import { oneDark } from './themes/oneDark';
import { synthwave } from './themes/synthwave';
import { tokyoNight } from './themes/tokyoNight';
import { zap } from './themes/zap';

const themeMap = {
  andromeda,
  ayu,
  dracula,
  github,
  monokai,
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
