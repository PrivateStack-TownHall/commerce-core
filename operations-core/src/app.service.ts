import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth() {
    return {
      success: true,
      message: 'Operations Core API',
      version: '1.0.0',
    };
  }
}
