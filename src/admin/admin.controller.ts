import {
  Controller,
  Post,
  Get,
  Body,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  @Redirect('/admin.html', 302)
  serveAdmin() {}

  @Post('login')
  login(@Body('password') password: string) {
    const adminPw = process.env.ADMIN_PASSWORD;
    if (!adminPw || !password || password !== adminPw) {
      throw new UnauthorizedException('Invalid password');
    }
    return { token: adminPw };
  }
}
