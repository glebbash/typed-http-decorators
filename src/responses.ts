import { HttpResponse, HttpResponseType, HttpStatus, InstanceOf, Type } from './types';

const newResponse = <Status extends number>(status: Status) =>
  Object.assign(
    <BodyType extends Type>(body: InstanceOf<BodyType>): HttpResponse<Status, BodyType> => {
      return { status, body };
    },
    {
      Type: <BodyType extends Type>(body: BodyType): HttpResponseType<Status, BodyType> => {
        return { status, body };
      },
    }
  );

export type GetType<
  R extends (...args: never[]) => HttpResponse<number, Type>,
  T extends Type
> = HttpResponse<ReturnType<R>['status'], T>;

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

export type Continue<T extends Type> = GetType<typeof Continue, T>;
export type SwitchingProtocols<T extends Type> = GetType<typeof SwitchingProtocols, T>;
export type Processing<T extends Type> = GetType<typeof Processing, T>;
export type EarlyHints<T extends Type> = GetType<typeof EarlyHints, T>;
export type Ok<T extends Type> = GetType<typeof Ok, T>;
export type Created<T extends Type> = GetType<typeof Created, T>;
export type Accepted<T extends Type> = GetType<typeof Accepted, T>;
export type NonAuthoritativeInformation<T extends Type> = GetType<
  typeof NonAuthoritativeInformation,
  T
>;
export type NoContent<T extends Type> = GetType<typeof NoContent, T>;
export type ResetContent<T extends Type> = GetType<typeof ResetContent, T>;
export type PartialContent<T extends Type> = GetType<typeof PartialContent, T>;
export type Ambiguous<T extends Type> = GetType<typeof Ambiguous, T>;
export type MovedPermanently<T extends Type> = GetType<typeof MovedPermanently, T>;
export type Found<T extends Type> = GetType<typeof Found, T>;
export type SeeOther<T extends Type> = GetType<typeof SeeOther, T>;
export type NotModified<T extends Type> = GetType<typeof NotModified, T>;
export type TemporaryRedirect<T extends Type> = GetType<typeof TemporaryRedirect, T>;
export type PermanentRedirect<T extends Type> = GetType<typeof PermanentRedirect, T>;
export type BadRequest<T extends Type> = GetType<typeof BadRequest, T>;
export type Unauthorized<T extends Type> = GetType<typeof Unauthorized, T>;
export type PaymentRequired<T extends Type> = GetType<typeof PaymentRequired, T>;
export type Forbidden<T extends Type> = GetType<typeof Forbidden, T>;
export type NotFound<T extends Type> = GetType<typeof NotFound, T>;
export type MethodNotAllowed<T extends Type> = GetType<typeof MethodNotAllowed, T>;
export type NotAcceptable<T extends Type> = GetType<typeof NotAcceptable, T>;
export type ProxyAuthenticationRequired<T extends Type> = GetType<
  typeof ProxyAuthenticationRequired,
  T
>;
export type RequestTimeout<T extends Type> = GetType<typeof RequestTimeout, T>;
export type Conflict<T extends Type> = GetType<typeof Conflict, T>;
export type Gone<T extends Type> = GetType<typeof Gone, T>;
export type LengthRequired<T extends Type> = GetType<typeof LengthRequired, T>;
export type PreconditionFailed<T extends Type> = GetType<typeof PreconditionFailed, T>;
export type PayloadTooLarge<T extends Type> = GetType<typeof PayloadTooLarge, T>;
export type UriTooLong<T extends Type> = GetType<typeof UriTooLong, T>;
export type UnsupportedMediaType<T extends Type> = GetType<typeof UnsupportedMediaType, T>;
export type RequestedRangeNotSatisfiable<T extends Type> = GetType<
  typeof RequestedRangeNotSatisfiable,
  T
>;
export type ExpectationFailed<T extends Type> = GetType<typeof ExpectationFailed, T>;
export type IAmATeapot<T extends Type> = GetType<typeof IAmATeapot, T>;
export type Misdirected<T extends Type> = GetType<typeof Misdirected, T>;
export type UnprocessableEntity<T extends Type> = GetType<typeof UnprocessableEntity, T>;
export type FailedDependency<T extends Type> = GetType<typeof FailedDependency, T>;
export type TooManyRequests<T extends Type> = GetType<typeof TooManyRequests, T>;
export type InternalServerError<T extends Type> = GetType<typeof InternalServerError, T>;
export type NotImplemented<T extends Type> = GetType<typeof NotImplemented, T>;
export type BadGateway<T extends Type> = GetType<typeof BadGateway, T>;
export type ServiceUnavailable<T extends Type> = GetType<typeof ServiceUnavailable, T>;
export type GatewayTimeout<T extends Type> = GetType<typeof GatewayTimeout, T>;
export type HttpVersionNotSupported<T extends Type> = GetType<typeof HttpVersionNotSupported, T>;
