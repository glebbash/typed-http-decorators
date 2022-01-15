# typed-http-decorators

[![Deploy](https://github.com/glebbash/typed-http-decorators/workflows/build/badge.svg)](https://github.com/glebbash/typed-http-decorators/actions)
[![Coverage Status](https://coveralls.io/repos/github/glebbash/typed-http-decorators/badge.svg?branch=master)](https://coveralls.io/github/glebbash/typed-http-decorators?branch=master)

Typesafe decorators for HTTP endpoints

## Installation

```sh
npm i typed-http-decorators
```

## Usage

<!-- TODO: add better docs -->

Decorate endpoints:

```ts
// main.ts
import './overrides';

import { Method, NotFound, Ok } from './rest';

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

Specify endpoint decorator logic (you can apply Nest.js decorators for example):

```ts
// overrides.ts
import { setEndpointDecorator } from 'typed-http-decorators';

// You can add additional properties to EndpointOptions like this:
declare module './rest' {
  interface EndpointOptions {
    permissions: string[];
  }
}

setEndpointDecorator((method, path, { permissions }) => (cls, endpointName) => {
  // Endpoint decoration logic
  console.log(
    `Decorating ${cls.name}.${String(endpointName)}`,
    `with route ${method} /${path} with permissions: ${permissions}`
  );
});
```

Bootstrapped with: [create-ts-lib-gh](https://github.com/glebbash/create-ts-lib-gh)

This project is [Mit Licensed](LICENSE).
