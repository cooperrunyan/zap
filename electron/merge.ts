export function merge(x: any, master: any) {
  for (const [k, v] of Object.entries(master)) {
    if (x[k] === undefined) {
      x[k] = v;
      continue;
    }

    if (typeof v === 'object') {
      if (typeof x[k] === 'string') x[k] = v;
      else merge(x[k] as any, v as any);
    }
  }
  return x;
}

// type Obj = { [key: string]: (string | boolean | number | any[]) |  };
