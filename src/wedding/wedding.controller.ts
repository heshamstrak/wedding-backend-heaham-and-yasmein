import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  Req,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { WeddingService } from './wedding.service';

@Controller('wedding')
export class WeddingController {
  constructor(private readonly weddingService: WeddingService) {}

  @Post('visit')
  trackVisit(@Req() req: Request) {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.ip;
    return this.weddingService.trackVisit(ip);
  }

  @Post('rsvp')
  submitRsvp(
    @Body()
    body: {
      name: string;
      adults: number;
      children: number;
      message?: string;
    },
  ) {
    if (!body?.name?.trim()) {
      throw new BadRequestException('name is required');
    }
    return this.weddingService.submitRsvp(body);
  }

  @Get('stats')
  getStats(@Headers('x-admin-token') token: string) {
    const adminPw = process.env.ADMIN_PASSWORD;
    if (!adminPw || !token || token !== adminPw) {
      throw new UnauthorizedException();
    }
    return this.weddingService.getStats();
  }
}
