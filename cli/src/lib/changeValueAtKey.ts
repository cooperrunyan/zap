import { KeyType } from './KeyType.ts';

const values = new KeyType().values();

export function changeValueAtKey<ObjectType>(
  object: ObjectType,
  path: string,
  stringNewValue: any,
  reset: boolean = false
) {
  const newValue = // Convert string types to primitives
    stringNewValue === 'true'
      ? true
      : stringNewValue === 'false'
      ? false
      : !Number.isNaN(+stringNewValue)
      ? +stringNewValue
      : stringNewValue === 'null'
      ? null
      : stringNewValue;

  try {
    const re = new RegExp(path);
    if (!reset)
      for (const key of values) {
        if (re.test(key) && path !== key) return 'cannot change directly'; // If it is only a fragment of another complete key
      }

    const keys = path.split('.');
    let result = object;
    for (const key of keys) {
      const i = keys.indexOf(key);
      if (i < keys.length - 1) {
        if (!(result as any)[key]) (result as any)[key] = {};
        result = (result as any)[key];
      }
    }

    (result as any)[keys.at(-1) || ''] = newValue;
    if (reset) delete (result as any)[keys.at(-1) || ''];
    return object;
  } catch {
    return 'key not found';
  }
}
