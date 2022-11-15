export function getKey<ObjectType>(object: ObjectType, path: string) {
  try {
    const keys = path.split('.');
    let result = object;
    for (const key of keys) result = (result as any)[key];
    return result;
  } catch {
    return null;
  }
}
