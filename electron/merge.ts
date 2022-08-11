export function merge(x: Obj, master: Obj) {
  for (const [k, v] of Object.entries(master)) {
    if (x[k] === undefined) {
      x[k] = v;
      continue;
    }

    if (typeof v === 'object') {
      if (typeof x[k] === 'string') x[k] = v;
      else merge(x[k] as Obj, v as Obj);
    }
  }
  return x;
}

type Obj = { [key: string]: (string | boolean | number | any[]) | object };
