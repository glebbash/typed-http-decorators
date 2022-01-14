import { EndpointDecorator, getEndpointDecorator } from './endpoint-decorator';
import { Type } from './type-utils';
import { EndpointOptions, HttpMethod, HttpResponseType } from './typed-http-decorators';

const newEndpointDecorator =
  (method: HttpMethod) =>
  <RTS extends readonly HttpResponseType<number, Type<unknown>>[]>(
    path: string,
    options: EndpointOptions<RTS>
  ): EndpointDecorator<RTS> =>
    getEndpointDecorator(method, path, options);

export const Get = newEndpointDecorator('GET');
export const Post = newEndpointDecorator('POST');
export const Put = newEndpointDecorator('PUT');
export const Delete = newEndpointDecorator('DELETE');
export const Patch = newEndpointDecorator('PATCH');
export const All = newEndpointDecorator('ALL');
export const Options = newEndpointDecorator('OPTIONS');
export const Head = newEndpointDecorator('HEAD');
