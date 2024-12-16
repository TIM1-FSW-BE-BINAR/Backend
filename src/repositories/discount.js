import { prisma } from '../database/db.js';

export class DiscountRepository {
  static async create(data) {
    return await prisma.discount.create({ data });
  }

  static async update(discountID, data) {
    return await prisma.discount.update({
      where: { id: discountID },
      data,
    });
  }

  static async delete(discountID) {
    return await prisma.discount.delete({
      where: { id: discountID },
    });
  }

  static async findMany(pagination, filter, sorter) {
    return await prisma.discount.findMany({
      skip: pagination?.offset || 0,
      take: pagination?.limit || undefined,
      where: filter,
      orderBy: sorter || undefined,
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
        type: true,
        value: true,
        startDate: true,
        endDate: true,
        minPurchase: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async findByID(discountID) {
    return await prisma.discount.findUnique({
      where: { id: discountID },
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
        type: true,
        value: true,
        startDate: true,
        endDate: true,
        minPurchase: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async count(filter) {
    return await prisma.discount.count({ where: filter });
  }

  static async findByCode(code) {
    return await prisma.discount.findFirst({
      where: { code },
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
        type: true,
        value: true,
        startDate: true,
        endDate: true,
        minPurchase: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
