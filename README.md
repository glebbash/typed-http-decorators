# typed-http-decorators

[![Deploy](https://github.com/glebbash/typed-http-decorators/workflows/build/badge.svg)](https://github.com/glebbash/typed-http-decorators/actions)
[![Coverage Status](https://coveralls.io/repos/github/glebbash/typed-http-decorators/badge.svg?branch=master)](https://coveralls.io/github/glebbash/typed-http-decorators?branch=master)

Typesafe decorators for HTTP endpoints which integrates nicely with [Nest.js](https://nestjs.com).

- [typed-http-decorators](#typed-http-decorators)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Nest.js integration](#nestjs-integration)
  - [Testing](#testing)

## Installation

```sh
npm i typed-http-decorators
```

## Usage

Decorate endpoints:

```ts
// Source: main.ts

/*
!!! You must import your decorator logic before applying typed-http-decorators !!!
*/
import './overrides';

import { Method, NotFound, Ok } from 'typed-http-decorators';

class NotFoundDto {
  constructor(public message: string) {}
}

class ResourceDto {
  constructor(public id: string, public name: string) {}
}

export class ResourceController {
  @Method.Get('resource/:resourceId', {
    permissions: ['resource.get'],
    responses: [Ok.Type(ResourceDto), NotFound.Type(NotFoundDto)] as const,
  })
  // You can remove return type annotation and still have type safety
  async getResource(): Promise<Ok<ResourceDto> | NotFound<NotFoundDto>> {
    return Ok(new ResourceDto('id', 'name'));
  }
}
```

Specify endpoint decorator logic:

```ts
// Source: overrides.ts

import { setEndpointDecorator } from 'typed-http-decorators';

// You can add additional properties to EndpointOptions like this:
declare module './rest' {
  interface EndpointOptions {
    permissions: string[];
  }
}

setEndpointDecorator((method, path, { permissions }) => (cls, endpointName) => {
  // Your endpoint decoration logic:
  console.log(
    `Decorating ${cls.name}.${String(endpointName)}`,
    `with route ${method} /${path} with permissions: ${permissions}`
  );
});
```

## Nest.js integration

Controller example:

```ts
// Source: src/films/films.controller.ts

import { TypedResponseInterceptor } from '../common/typed-response.interceptor'
import { Controller, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Method, Ok } from 'typed-http-decorators'
import { FilmsDto } from './dto/films.dto'
import { FilmsService } from './films.service'

@ApiTags('films')
@Controller('films')
/* You need to transform typed responses to the ones accepted bt Nest.js */
@UseInterceptors(new TypedResponseInterceptor())
export class FilmsController {
    constructor(private films: FilmsService) {}

    @Method.Get('', {
        summary: 'Get all films',
        description: 'Gets all films from the database',
        responses: [Ok.Type(FilmsDto)] as const,
    })
    async getAllFilms() {
        return Ok(
          new FilmsDto({
            films: [
              new FilmDto('id', 'name'),
              new FilmDto('id', 'name'),
            ]
          })
        )
    }
}
```

Decorator logic:

```ts
// Source: src/common/http-decorators-logic.ts

import { applyDecorators, RequestMapping, RequestMethod } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { setEndpointDecorator } from 'typed-http-decorators'

declare module 'typed-http-decorators' {
    interface EndpointOptions {
        /* This way you force endpoint options to be specified */
        summary: string
        /* Or you can also make them optional */
        description?: string
    }
}

setEndpointDecorator((method, path, { responses, summary, description }) =>
    applyDecorators(
        // Apply Nest.js specific endpoint decorators
        RequestMapping({ method: RequestMethod[method], path }),
        ...responses.map(({ status, bodyType }) =>
            ApiResponse({ status, type: bodyType }),
        ),

        // Apply your custom decorators
        ApiOperation({ summary, description }),
    ),
)
```

Typed responses interceptor:

```ts
// Source: src/common/typed-response.interceptor.ts

import {
    CallHandler,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    NestInterceptor,
} from '@nestjs/common'
import { catchError, map, throwError } from 'rxjs'

@Injectable()
export class TypedResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map(({ status, body }) => {
                context.switchToHttp().getResponse().status(status)
                return body
            }),
            catchError(() =>
                throwError(() => new InternalServerErrorException()),
            ),
        )
    }
}
```

Entrypoint:

```ts
// Source: src/main.ts

/*
!!! Remember to have decorator logic as the first import !!!
*/
import './common/http-decorators-logic'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

Note: If all your endpoints return typed responses
you can apply TypedResponseInterceptor globally instead of applying it to each controller:

```ts
app.useGlobalInterceptors(new TypedResponseInterceptor())
```

## Testing

When testing your controllers you must also import your decorator logic before applying typed-http-decorators.

You can do this automatically with [Jest](https://jestjs.io/):
```jsonc
{
  // jest configuration ...
  setupFiles: [
    './src/common/http-decorators-logic.ts', // your decorator logic
    // other setup files ...
  ]
}
```

If your testing framework does not support this feature you can manually import your decorator logic in the first import of each testing module.

Bootstrapped with: [create-ts-lib-gh](https://github.com/glebbash/create-ts-lib-gh)

This project is [Mit Licensed](LICENSE).
