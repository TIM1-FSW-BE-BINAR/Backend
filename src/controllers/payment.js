import { PaymentService } from '../services/payment.js';

export class PaymentController {
  static async create(req, res, next) {
    try {
      const customerDetails = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        phone: req.user.phone,
      };

      const snapToken = await PaymentService.create({
        id: req.body.bookingId,
        userId: req.user.id,
        customerDetails,
      });

      res.status(201).json({
        meta: {
          statusCode: 201,
          message: 'Snap token created successfully',
        },
        data: { snapToken },
      });
    } catch (e) {
      next(e);
    }
  }

  static async handleWebhook(req, res, next) {
    try {
      console.log(req.body);
      const {
        order_id: orderId,
        transaction_status: paymentstatus,
        payment_type: paymentType,
        transaction_id: transactionId,
        transaction_time: transactionTime,
      } = req.body;

      await PaymentService.processWebhook({
        orderId,
        paymentStatus: paymentstatus.toUpperCase(),
        paymentType: paymentType.toUpperCase(),
        transactionId,
        transactionTime,
      });

      res.status(200).send('OK');
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req, res, next) {
    try {
      const payment = await PaymentService.getAll(req.query);
      res.json({
        meta: {
          statusCode: 200,
          message: 'Payments retrieved successfully',
        },
        data: payment,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req, res, next) {
    try {
      const paymentId = parseInt(req.params.id, 10);
      const payment = await PaymentService.getById(paymentId);
      res.json({
        meta: {
          statusCode: 200,
          message: 'Payment retrieved successfully',
        },
        data: payment,
      });
    } catch (e) {
      next(e);
    }
  }

  static async cancel(req, res, next) {
    try {
      const { orderId } = req.params;
      const transaction = await PaymentService.cancel(orderId);

      res.status(200).json({
        meta: {
          statusCode: 200,
          message: 'Transaction canceled successfully',
        },
        data: transaction,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      await PaymentService.delete(req.params.id);
      res.json({
        meta: {
          statusCode: 200,
          message: 'Payment deleted successfully',
        },
      });
    } catch (e) {
      next(e);
    }
  }
}