import schema from '../../../settings-schema.json' assert { type: 'json' };
import { cliffy } from '../../deps.ts';

export class KeyType extends cliffy.Type<string> {
  public parse({ label, name, value, type }: cliffy.ITypeInfo) {
    if (!this.values().includes(value)) {
      throw new Error(
        `${label} "${name}" must be of type "${type}", but got "${value}". Valid options are: '${Object.keys(
          schema.properties
        ).join("', '")}'`
      );
    }
    return value;
  }

  public values() {
    const keys = [];

    for (const [k1, p1] of Object.entries(schema.properties)) {
      keys.push(k1);
      for (const [k2, p2] of Object.entries(p1.properties || {})) {
        keys.push(`${k1}.${k2}`);
        for (const [k3, p3] of Object.entries(p2?.properties || {})) {
          keys.push(`${k1}.${k2}.${k3}`);
          for (const [k4, p4] of Object.entries((p3 as any)?.properties || {})) {
            keys.push(`${k1}.${k2}.${k3}.${k4}`);
            for (const [k5, p5] of Object.entries((p4 as any)?.properties || {})) {
              keys.push(`${k1}.${k2}.${k3}.${k4}.${k5}`);
              for (const [k6, p6] of Object.entries((p5 as any)?.properties || {})) {
                keys.push(`${k1}.${k2}.${k3}.${k4}.${k5}.${k6}`);
              }
            }
          }
        }
      }
    }

    return keys;
  }
}
