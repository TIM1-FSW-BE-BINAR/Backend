import express from 'express';
import validation from '../middlewares/validator.js';
import { DiscountController } from '../controllers/discount.js';
import { discountSchema } from '../utils/validationSchema.js';

const router = express.Router();

router
  .route('/')
  .get(DiscountController.getAll)
  .post(validation(discountSchema), DiscountController.create);

router
  .route('/:id')
  .get(DiscountController.getByID)
  .put(validation(discountSchema), DiscountController.update)
  .delete(DiscountController.delete);

export default router;
