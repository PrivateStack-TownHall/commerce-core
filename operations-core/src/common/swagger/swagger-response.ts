import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export interface SwaggerOptions {
  summary: string;
  description?: string;
  bearer?: boolean;
}

export function SwaggerResponse(options: SwaggerOptions): MethodDecorator {
  const decorators: MethodDecorator[] = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),

    ApiOkResponse({
      description: 'Request successful.',
    }),

    ApiBadRequestResponse({
      description: 'Bad request.',
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.',
    }),

    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),

    ApiNotFoundResponse({
      description: 'Resource not found.',
    }),

    ApiConflictResponse({
      description: 'Conflict.',
    }),

    ApiInternalServerErrorResponse({
      description: 'Internal server error.',
    }),
  ];

  if (options.bearer) {
    decorators.push(ApiBearerAuth());
  }

  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    decorators.forEach((decorator) =>
      decorator(target, propertyKey, descriptor),
    );
  };
}
