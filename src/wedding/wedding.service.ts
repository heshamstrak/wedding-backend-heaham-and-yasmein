import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WeddingService {
  constructor(private readonly prisma: PrismaService) {}

  async trackVisit(ip?: string) {
    await this.prisma.visit.create({ data: { ip: ip || null } });
    return { ok: true };
  }

  async submitRsvp(data: {
    name: string;
    adults: number;
    children: number;
    message?: string;
  }) {
    const rsvp = await this.prisma.rsvp.create({
      data: {
        name: String(data.name).slice(0, 120),
        adults: Math.max(1, parseInt(String(data.adults)) || 1),
        children: Math.max(0, parseInt(String(data.children)) || 0),
        message: data.message ? String(data.message).slice(0, 600) : null,
      },
    });
    return { ok: true, id: rsvp.id };
  }

  async getStats() {
    const [visitsCount, rsvps] = await Promise.all([
      this.prisma.visit.count(),
      this.prisma.rsvp.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);

    const totalAdults = rsvps.reduce((s, r) => s + r.adults, 0);
    const totalChildren = rsvps.reduce((s, r) => s + r.children, 0);

    return {
      visitsCount,
      rsvpsCount: rsvps.length,
      totalAdults,
      totalChildren,
      totalGuests: totalAdults + totalChildren,
      rsvps,
    };
  }
}
