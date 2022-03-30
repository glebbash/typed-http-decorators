import {
  HttpResponse,
  HttpResponseOptions,
  HttpResponseType,
  HttpResponseTypeOptions,
  HttpStatus,
  InstanceOf,
  Type,
} from './types';

export type ResponseConstructor<Status extends number> = <BodyType extends Type>(
  body: InstanceOf<BodyType>,
  options?: HttpResponseOptions
) => HttpResponse<Status, BodyType>;

export type ResponseTypeConstructor<Status extends number> = <BodyType extends Type>(
  body: BodyType,
  options?: HttpResponseTypeOptions
) => HttpResponseType<Status, BodyType>;

const newResponse = <Status extends number>(status: Status) =>
  Object.assign(
    ((body, options) => {
      return { status, body, options };
    }) as ResponseConstructor<Status>,
    {
      Type: ((body, options) => {
        return { status, body, options };
      }) as ResponseTypeConstructor<Status>,
    }
  );

export const Continue = newResponse(HttpStatus.CONTINUE);
export const SwitchingProtocols = newResponse(HttpStatus.SWITCHING_PROTOCOLS);
export const Processing = newResponse(HttpStatus.PROCESSING);
export const EarlyHints = newResponse(HttpStatus.EARLY_HINTS);
export const Ok = newResponse(HttpStatus.OK);
export const Created = newResponse(HttpStatus.CREATED);
export const Accepted = newResponse(HttpStatus.ACCEPTED);
export const NonAuthoritativeInformation = newResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION);
export const NoContent = newResponse(HttpStatus.NO_CONTENT);
export const ResetContent = newResponse(HttpStatus.RESET_CONTENT);
export const PartialContent = newResponse(HttpStatus.PARTIAL_CONTENT);
export const Ambiguous = newResponse(HttpStatus.AMBIGUOUS);
export const MovedPermanently = newResponse(HttpStatus.MOVED_PERMANENTLY);
export const Found = newResponse(HttpStatus.FOUND);
export const SeeOther = newResponse(HttpStatus.SEE_OTHER);
export const NotModified = newResponse(HttpStatus.NOT_MODIFIED);
export const TemporaryRedirect = newResponse(HttpStatus.TEMPORARY_REDIRECT);
export const PermanentRedirect = newResponse(HttpStatus.PERMANENT_REDIRECT);
export const BadRequest = newResponse(HttpStatus.BAD_REQUEST);
export const Unauthorized = newResponse(HttpStatus.UNAUTHORIZED);
export const PaymentRequired = newResponse(HttpStatus.PAYMENT_REQUIRED);
export const Forbidden = newResponse(HttpStatus.FORBIDDEN);
export const NotFound = newResponse(HttpStatus.NOT_FOUND);
export const MethodNotAllowed = newResponse(HttpStatus.METHOD_NOT_ALLOWED);
export const NotAcceptable = newResponse(HttpStatus.NOT_ACCEPTABLE);
export const ProxyAuthenticationRequired = newResponse(HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
export const RequestTimeout = newResponse(HttpStatus.REQUEST_TIMEOUT);
export const Conflict = newResponse(HttpStatus.CONFLICT);
export const Gone = newResponse(HttpStatus.GONE);
export const LengthRequired = newResponse(HttpStatus.LENGTH_REQUIRED);
export const PreconditionFailed = newResponse(HttpStatus.PRECONDITION_FAILED);
export const PayloadTooLarge = newResponse(HttpStatus.PAYLOAD_TOO_LARGE);
export const UriTooLong = newResponse(HttpStatus.URI_TOO_LONG);
export const UnsupportedMediaType = newResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
export const RequestedRangeNotSatisfiable = newResponse(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
export const ExpectationFailed = newResponse(HttpStatus.EXPECTATION_FAILED);
export const IAmATeapot = newResponse(HttpStatus.I_AM_A_TEAPOT);
export const Misdirected = newResponse(HttpStatus.MISDIRECTED);
export const UnprocessableEntity = newResponse(HttpStatus.UNPROCESSABLE_ENTITY);
export const FailedDependency = newResponse(HttpStatus.FAILED_DEPENDENCY);
export const TooManyRequests = newResponse(HttpStatus.TOO_MANY_REQUESTS);
export const InternalServerError = newResponse(HttpStatus.INTERNAL_SERVER_ERROR);
export const NotImplemented = newResponse(HttpStatus.NOT_IMPLEMENTED);
export const BadGateway = newResponse(HttpStatus.BAD_GATEWAY);
export const ServiceUnavailable = newResponse(HttpStatus.SERVICE_UNAVAILABLE);
export const GatewayTimeout = newResponse(HttpStatus.GATEWAY_TIMEOUT);
export const HttpVersionNotSupported = newResponse(HttpStatus.HTTP_VERSION_NOT_SUPPORTED);

export type GetType<R extends (...args: never[]) => HttpResponse<number, Type>, T> = HttpResponse<
  ReturnType<R>['status'],
  Type<T>
>;

export type Continue<T> = GetType<typeof Continue, T>;
export type SwitchingProtocols<T> = GetType<typeof SwitchingProtocols, T>;
export type Processing<T> = GetType<typeof Processing, T>;
export type EarlyHints<T> = GetType<typeof EarlyHints, T>;
export type Ok<T> = GetType<typeof Ok, T>;
export type Created<T> = GetType<typeof Created, T>;
export type Accepted<T> = GetType<typeof Accepted, T>;
export type NonAuthoritativeInformation<T> = GetType<typeof NonAuthoritativeInformation, T>;
export type NoContent<T> = GetType<typeof NoContent, T>;
export type ResetContent<T> = GetType<typeof ResetContent, T>;
export type PartialContent<T> = GetType<typeof PartialContent, T>;
export type Ambiguous<T> = GetType<typeof Ambiguous, T>;
export type MovedPermanently<T> = GetType<typeof MovedPermanently, T>;
export type Found<T> = GetType<typeof Found, T>;
export type SeeOther<T> = GetType<typeof SeeOther, T>;
export type NotModified<T> = GetType<typeof NotModified, T>;
export type TemporaryRedirect<T> = GetType<typeof TemporaryRedirect, T>;
export type PermanentRedirect<T> = GetType<typeof PermanentRedirect, T>;
export type BadRequest<T> = GetType<typeof BadRequest, T>;
export type Unauthorized<T> = GetType<typeof Unauthorized, T>;
export type PaymentRequired<T> = GetType<typeof PaymentRequired, T>;
export type Forbidden<T> = GetType<typeof Forbidden, T>;
export type NotFound<T> = GetType<typeof NotFound, T>;
export type MethodNotAllowed<T> = GetType<typeof MethodNotAllowed, T>;
export type NotAcceptable<T> = GetType<typeof NotAcceptable, T>;
export type ProxyAuthenticationRequired<T> = GetType<typeof ProxyAuthenticationRequired, T>;
export type RequestTimeout<T> = GetType<typeof RequestTimeout, T>;
export type Conflict<T> = GetType<typeof Conflict, T>;
export type Gone<T> = GetType<typeof Gone, T>;
export type LengthRequired<T> = GetType<typeof LengthRequired, T>;
export type PreconditionFailed<T> = GetType<typeof PreconditionFailed, T>;
export type PayloadTooLarge<T> = GetType<typeof PayloadTooLarge, T>;
export type UriTooLong<T> = GetType<typeof UriTooLong, T>;
export type UnsupportedMediaType<T> = GetType<typeof UnsupportedMediaType, T>;
export type RequestedRangeNotSatisfiable<T> = GetType<typeof RequestedRangeNotSatisfiable, T>;
export type ExpectationFailed<T> = GetType<typeof ExpectationFailed, T>;
export type IAmATeapot<T> = GetType<typeof IAmATeapot, T>;
export type Misdirected<T> = GetType<typeof Misdirected, T>;
export type UnprocessableEntity<T> = GetType<typeof UnprocessableEntity, T>;
export type FailedDependency<T> = GetType<typeof FailedDependency, T>;
export type TooManyRequests<T> = GetType<typeof TooManyRequests, T>;
export type InternalServerError<T> = GetType<typeof InternalServerError, T>;
export type NotImplemented<T> = GetType<typeof NotImplemented, T>;
export type BadGateway<T> = GetType<typeof BadGateway, T>;
export type ServiceUnavailable<T> = GetType<typeof ServiceUnavailable, T>;
export type GatewayTimeout<T> = GetType<typeof GatewayTimeout, T>;
export type HttpVersionNotSupported<T> = GetType<typeof HttpVersionNotSupported, T>;
