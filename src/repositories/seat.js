import { SeatClass } from '@prisma/client';
import { prisma } from '../database/db.js';

export class SeatRepository {
  static async create(data) {
    const seat = await prisma.seat.create({
      data,
    });

    return seat;
  }

  static async update(id, data) {
    const seat = await prisma.seat.update({
      where: {
        id,
      },
      data,
    });

    return seat;
  }

  static async delete(id) {
    const seat = await prisma.seat.delete({
      where: {
        id,
      },
    });

    return seat;
  }

  static async findMany(pagination, where) {
    const seats = await prisma.seat.findMany({
      skip: pagination.offset,
      take: pagination.limit,
      where,
      include: {
        _count: true,
        flight: true,
      },
    });

    return seats;
  }

  static async count(where) {
    const totalSeats = await prisma.seat.count({
      where,
    });

    return totalSeats;
  }

  static async getClassEnum() {
    return SeatClass;
  }

  static async findById(id) {
    const seat = await prisma.seat.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        flight: true,
      },
    });

    return seat;
  }

  static async findBySeatNumber(seatNumber) {
    const seats = await prisma.seat.findMany({
      where: {
        seatNumber,
      },
      include: {
        flight: {
          include: {
            airline: true,
            arrival: true,
            departure: true,
          },
        },
      },
    });

    return seats;
  }

  static async exists(flightId, seatNumber) {
    const seat = await prisma.seat.findFirst({
      where: {
        flightId: flightId,
        seatNumber: seatNumber,
      },
    });
    return !!seat;
  }
}
