import { OverrideOrDefault } from './utils/overrides';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'ALL' | 'OPTIONS' | 'HEAD';

export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export interface HttpResponseDefaults {
  A(): unknown;
  B(): unknown;
}

export type HttpResponseTypeOptions = OverrideOrDefault<HttpResponseTypeOptionsOverrides>;
export interface HttpResponseTypeOptionsOverrides {
  default: Record<string, unknown>;
}

export type HttpResponseOptions = OverrideOrDefault<HttpResponseOptionsOverrides>;
export interface HttpResponseOptionsOverrides {
  default: Record<string, unknown>;
}

export interface HttpResponseType<
  Status extends number = number,
  BodyType extends Type<unknown> = Type<unknown>
> {
  status: Status;
  body: BodyType;
  options?: HttpResponseTypeOptions;
}

export interface HttpResponse<Status extends number, BodyType extends Type<unknown>> {
  status: Status;
  body: InstanceOf<BodyType>;
  options?: HttpResponseOptions;
}

export type HttpResponseTypes = readonly HttpResponseType[];

// Helpers

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

export type ValueOf<RT> = RT extends HttpResponseType<infer Status, infer BodyType>
  ? HttpResponse<Status, BodyType>
  : never;
