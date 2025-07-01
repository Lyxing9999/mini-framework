export function getNestedValue<T extends Record<string, any>>(
  obj: T,
  path: string
): any {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
}
export function setNestedValue<T extends Record<string, any>>(
  obj: T,
  path: string,
  value: any
) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce(
    (o, k) => (o[k] ??= {}),
    obj as Record<string, any>
  );
  if (last) target[last] = value;
}
