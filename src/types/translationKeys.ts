type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

export type NestedKeys<T> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? K | Join<K, NestedKeys<T[K]>>
    : K;
}[keyof T];