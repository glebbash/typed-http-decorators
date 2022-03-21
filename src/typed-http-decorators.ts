export {
  type EndpointDecorator,
  type EndpointOptions,
  type GetEndpointDecorator,
  setEndpointDecorator,
} from './endpoint-decorator';
export * as Method from './methods';
export * from './responses';
export * from './types';
export const t = <XS extends readonly unknown[]>(...values: XS): XS => values;
export const either = t;
