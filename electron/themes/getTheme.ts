import * as themes from './index';

type ThemeString<T extends string> = T extends `${infer J}Theme` ? J : T;

export function theme(name: ThemeString<keyof typeof themes>) {
  return themes[`${name}Theme`];
}
