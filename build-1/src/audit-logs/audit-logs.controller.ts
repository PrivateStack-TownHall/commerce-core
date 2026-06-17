import {
   Controller,
   Get,
   Param,
   ParseIntPipe,
   UseGuards,
} from '@nestjs/common';

import {
   ApiBearerAuth,
   ApiOperation,
   ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AuditLogsService } from './audit-logs.service';

import {
   SwaggerNotFound,
   SwaggerSuccess,
   SwaggerUnauthorized,
} from '../common/swagger/swagger-response';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('audit-logs')
export class AuditLogsController {
   constructor(
      private readonly auditLogsService: AuditLogsService,
   ) { }

   @Get()
   @ApiOperation({
      summary: 'Get All Audit Logs',
      description:
         'Retrieve all audit logs ordered by latest first',
   })
   @SwaggerSuccess({
      data: [
         {
            id: 1,
            userId: 1,
            action: 'LOGIN',
            entity: 'User',
            entityId: '1',
            oldData: null,
            newData: null,
            ipAddress: null,
            createdAt:
               '2026-06-17T04:00:00.000Z',
         },
      ],
   })
   @SwaggerUnauthorized()
   findAll() {
      return this.auditLogsService.findAll();
   }

   @Get('user/:userId')
   @ApiOperation({
      summary:
         'Get Audit Logs By User',
      description:
         'Retrieve audit logs for a specific user',
   })
   @SwaggerSuccess({
      data: [
         {
            id: 1,
            userId: 1,
            action: 'LOGIN',
            entity: 'User',
            entityId: '1',
         },
      ],
   })
   @SwaggerUnauthorized()
   findByUser(
      @Param(
         'userId',
         ParseIntPipe,
      )
      userId: number,
   ) {
      return this.auditLogsService.findByUser(
         userId,
      );
   }

   @Get(':id')
   @ApiOperation({
      summary: 'Get Audit Log',
      description:
         'Retrieve audit log detail by id',
   })
   @SwaggerSuccess({
      data: {
         id: 1,
         userId: 1,
         action: 'LOGIN',
         entity: 'User',
         entityId: '1',
         oldData: null,
         newData: null,
         ipAddress: null,
         createdAt:
            '2026-06-17T04:00:00.000Z',
      },
   })
   @SwaggerUnauthorized()
   @SwaggerNotFound(
      'Audit log not found',
   )
   findOne(
      @Param(
         'id',
         ParseIntPipe,
      )
      id: number,
   ) {
      return this.auditLogsService.findOne(
         id,
      );
   }
}