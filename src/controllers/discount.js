import { DiscountService } from '../services/discount.js';

export class DiscountController {
  static async create(req, res, next) {
    try {
      const data = req.body;

      let startDate = new Date(data.startDate);
      let endDate = new Date(data.endDate);

      if (isNaN(startDate) || isNaN(endDate)) {
        throw new ErrorHandler(400, 'Invalid date format');
      }

      const discount = await DiscountService.create(data);
      console.log(discount);

      res.status(201).json({
        meta: { statusCode: 201, message: 'Discount created successfully' },
        data: discount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const discountID = parseInt(req.params.id);
      const data = req.body;

      if (isNaN(discountID)) {
        throw new ErrorHandler(422, 'Discount ID must be a number');
      }

      const discount = await DiscountService.update(discountID, data);

      const formattedDiscount = {
        ...discount,
        id: discount.id.toString(),
      };

      res.status(200).json({
        meta: { statusCode: 200, message: 'Discount updated successfully' },
        data: formattedDiscount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const discountID = parseInt(req.params.id);

      if (isNaN(discountID)) {
        throw new ErrorHandler(422, 'Discount ID must be a number');
      }

      const discount = await DiscountService.delete(discountID);

      const formattedDiscount = {
        ...discount,
        id: discount.id.toString(),
      };

      res.status(200).json({
        meta: { statusCode: 200, message: 'Discount deleted successfully' },
        data: formattedDiscount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { code, isActive, startDate, endDate } = req.query;

      const condition = {};
      if (code) condition.code = { contains: code, mode: 'insensitive' };
      if (isActive !== undefined) condition.isActive = isActive === 'true';

      if (startDate) {
        const start = new Date(startDate);
        if (isNaN(start))
          throw new ErrorHandler(400, 'Invalid startDate format');
        condition.startDate = { gte: start };
      }

      if (endDate) {
        const end = new Date(endDate);
        if (isNaN(end)) throw new ErrorHandler(400, 'Invalid endDate format');
        condition.endDate = { lte: end };
      }

      const pagination = { offset: (page - 1) * limit, limit };
      const { discounts, totalDiscounts } = await DiscountService.findMany(
        pagination,
        condition
      );

      const formattedDiscounts = discounts.map((discount) => ({
        ...discount,
        id: discount.id.toString(),
      }));

      res.status(200).json({
        meta: {
          statusCode: 200,
          message: 'Discounts retrieved successfully',
          pagination: {
            totalPage: Math.ceil(totalDiscounts / limit),
            currentPage: page,
            pageItems: discounts.length,
          },
        },
        data: formattedDiscounts,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByID(req, res, next) {
    try {
      const discountID = parseInt(req.params.id);

      if (isNaN(discountID)) {
        throw new ErrorHandler(422, 'Discount ID must be a number');
      }

      const discount = await DiscountService.findByID(discountID);

      const formattedDiscount = {
        ...discount,
        id: discount.id.toString(), // Pastikan field BigInt dikonversi
      };

      res.status(200).json({
        meta: { statusCode: 200, message: 'Discount retrieved successfully' },
        data: formattedDiscount,
      });
    } catch (error) {
      next(error);
    }
  }
}
