import { m } from 'multiline-str';

import {
  Conflict,
  Created,
  HttpStatus,
  Method,
  NotFound,
  Ok,
  setEndpointDecorator,
  t,
} from './typed-http-decorators';

describe('typed-http-decorators', () => {
  it('decorates method and type-checks responses', async () => {
    const decoratorLogs: string[] = [];

    setEndpointDecorator((method, path) => () => {
      decoratorLogs.push(`Decorating ${method} /${path}`);
    });

    class ResourceController {
      @Method.Post('resource', {
        responses: t(Created.Type(ResourceDto), Conflict.Type(ConflictDto)),
      })
      async createResource(id: string): Promise<Created<ResourceDto> | Conflict<ConflictDto>> {
        if (Math.random() > 0.5) {
          return Conflict(new ConflictDto(`Resource with id ${id} already exists`));
        }

        return Created(new ResourceDto(id, 'name'));
      }

      @Method.Get('resource/:resourceId', {
        responses: t(Ok.Type(ResourceDto), NotFound.Type(NotFoundDto)),
      })
      async getResource(id: string): Promise<Ok<ResourceDto> | NotFound<NotFoundDto>> {
        if (Math.random() > 0.5) {
          return NotFound(new NotFoundDto(`Resource with id ${id} not found`));
        }

        return Ok(new ResourceDto(id, 'name'));
      }
    }

    const res = await new ResourceController().createResource('id');
    expect([HttpStatus.CREATED, HttpStatus.CONFLICT]).toContain(res.status);
    expect(res).toBeDefined();

    expect(decoratorLogs).toStrictEqual([
      `Decorating POST /resource`,
      `Decorating GET /resource/:resourceId`,
    ]);
  });

  it('throws if no decorator logic was set', async () => {
    setEndpointDecorator(null);

    const decorateClass = () => {
      class ResourceController {
        @Method.Post('resource', {
          responses: t(Created.Type(ResourceDto)),
        })
        async createResource(): Promise<Created<ResourceDto>> {
          return Created(new ResourceDto('id', 'name'));
        }
      }

      return ResourceController;
    };

    expect(decorateClass).toThrow(
      new Error(m`
        Method decorator is not set.
          Make sure you call setEndpointDecorator before decorating 'createResource'
        `)
    );
  });
});

// Fixtures

class ResourceDto {
  constructor(public id: string, public name: string) {}
}

class NotFoundDto {
  private __type = this;

  constructor(public message: string) {}
}

class ConflictDto {
  private __type = this;

  constructor(public message: string) {}
}
