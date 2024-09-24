import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
    async create(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('createdAt') createdAt: string,
        @Body('email') email: string | null,
        @Body('password') password: string | null,
    ): Promise<Auth> {  // 返り値をPromise<Item>にする
        console.log('AuthController - POST /auth called');
        const newUser: Auth = {
            id,
            name,
            createdAt,
            email,
            password,
        };
        return await this.authService.create(newUser);  // 非同期処理なのでawaitを付ける
    }
}
