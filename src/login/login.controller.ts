import { Controller, Post, Body, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Query('url') url: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const result = await this.loginService.login(url, username, password);
    res.send({ message: result });
  }
}
