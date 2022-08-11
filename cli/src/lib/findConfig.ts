import schema from '../../../settings-schema.json' assert { type: 'json' };

export async function findConfig(key: string) {
  const keys = key.split('.');
  let result = schema;
  for (const key of keys) {
    result = ((result['properties'] as any)[key] as any) || ((result as any)[key] as any) || (result as any);
  }
  return result;
}
