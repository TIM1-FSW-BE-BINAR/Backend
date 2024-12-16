import { ErrorHandler } from '../middlewares/error.js';
import { DiscountRepository } from '../repositories/discount.js';

export class DiscountService {
  static async create(data) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (isNaN(startDate) || isNaN(endDate)) {
      throw new ErrorHandler(400, 'Invalid date format');
    }

    const existingDiscount = await DiscountRepository.findByCode(data.code);

    if (existingDiscount) {
      throw new ErrorHandler(409, 'Discount code already exists');
    }

    return await DiscountRepository.create({
      ...data,
      startDate,
      endDate,
    });
  }

  static async update(id, data) {
    const discount = await DiscountRepository.findByID(id);

    if (!discount) {
      throw new ErrorHandler(404, 'Discount not found');
    }

    return await DiscountRepository.update(id, data);
  }

  static async delete(id) {
    const discount = await DiscountRepository.findByID(id);

    if (!discount) {
      throw new ErrorHandler(404, 'Discount not found');
    }

    return await DiscountRepository.delete(id);
  }

  static async findMany(pagination, filter, sorter) {
    const discounts = await DiscountRepository.findMany(
      pagination,
      filter,
      sorter
    );
    const totalDiscounts = await DiscountRepository.count(filter);

    return {
      discounts,
      totalDiscounts,
    };
  }

  static async findByID(id) {
    const discount = await DiscountRepository.findByID(id);

    if (!discount) {
      throw new ErrorHandler(404, 'Discount not found');
    }

    return discount;
  }

  static async findByCode(code) {
    const discount = await DiscountRepository.findByCode(code);

    if (!discount) {
      throw new ErrorHandler(404, 'Discount not found');
    }

    return discount;
  }
}
