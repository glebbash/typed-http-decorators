export type Type<T = unknown> = { new (...args: never[]): T };

export type InstanceOf<T> = T extends Type<infer I> ? I : never;

export type TypedPropertyDecorator<T> = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

export type ArrayToUnion<A> = A extends readonly [infer X, ...infer XS]
  ? X | ArrayToUnion<XS>
  : never;
