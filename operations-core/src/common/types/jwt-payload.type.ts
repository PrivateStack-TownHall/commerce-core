import { AppType, Role } from '@prisma/client';

export interface JwtPayload {
  sub: string;

  email: string;

  role: Role;

  appType: AppType;
}
