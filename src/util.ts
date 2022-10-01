/* eslint-disable @typescript-eslint/no-explicit-any */

export type Mixin<T, Trait> = T & Omit<Trait, keyof T>;

export const mixin = <T extends object, Trait extends object>(
  object: T,
  trait: Trait,
): Mixin<T, Trait> =>
  new Proxy(object, {
    get: (target, key) => (target as any)[key] ?? (trait as any)[key],
  }) as any;
