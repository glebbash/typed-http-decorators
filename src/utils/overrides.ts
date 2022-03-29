export type OverrideOrDefault<T extends { default: unknown }> = T extends { override: unknown }
  ? T['override']
  : T['default'];
