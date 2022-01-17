import {
  ArrayToUnion,
  HttpMethod,
  HttpResponseTypes,
  TypedPropertyDecorator,
  ValueOf,
} from './types';

export interface EndpointOptions<RTS extends HttpResponseTypes = HttpResponseTypes> {
  responses: RTS;
}

export type EndpointDecorator<RTS extends HttpResponseTypes> = TypedPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) => Promise<ValueOf<ArrayToUnion<RTS>>>
>;

export type GetEndpointDecorator = <RTS extends HttpResponseTypes>(
  method: HttpMethod,
  path: string,
  options: EndpointOptions<RTS>
) => EndpointDecorator<RTS>;

const NO_ENDPOINT_DECORATOR_LOGIC: GetEndpointDecorator = () => (_, methodName) => {
  throw new Error(
    `Method decorator is not set.
  Make sure you call setEndpointDecorator before decorating '${String(methodName)}'`
  );
};

export let getEndpointDecorator = NO_ENDPOINT_DECORATOR_LOGIC;

export function setEndpointDecorator(decorator: GetEndpointDecorator | null): void {
  getEndpointDecorator = decorator ?? NO_ENDPOINT_DECORATOR_LOGIC;
}
