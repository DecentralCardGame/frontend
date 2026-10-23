// Keyword definitions are recursive (e.g. Reprogram -> Effect). Keep shared
// object references rather than leaving unresolved $refs in editor paths.
export function resolveCardRules(schema: any): any {
  const resolved = new WeakMap<object, any>();
  function visit(value: any): any {
    if (value === null || typeof value !== 'object') return value;
    if (resolved.has(value)) return resolved.get(value);
    if ('$ref' in value) {
      if (typeof value.$ref !== 'string' || !value.$ref.startsWith('#/definitions/')) {
        throw new Error(`Unsupported card schema reference: ${value.$ref}`);
      }
      const name = value.$ref.slice('#/definitions/'.length);
      const target = schema.definitions[name];
      if (!target) throw new Error(`Missing card schema definition: ${name}`);
      return visit(target);
    }
    const result: any = Array.isArray(value) ? [] : {};
    resolved.set(value, result);
    for (const [key, child] of Object.entries(value)) result[key] = visit(child);
    return result;
  }
  return visit(schema);
}
