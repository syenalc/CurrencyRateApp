import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
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

  @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<{ message: string; token?: string }> { // JWTトークンを返す
        const isLoginSuccessful = await this.authService.validateUser(email, password);
        if (isLoginSuccessful) {
            console.log('ログイン成功');
            const token = await this.authService.generateJwtToken(email); // JWTトークン生成
            return { message: 'ログイン成功', token }; // メッセージとJWTトークンを返す
        } else {
            console.log('ログイン失敗');
            throw new UnauthorizedException('ログインに失敗しました。'); // 401エラーレスポンス
    }
  }
}
