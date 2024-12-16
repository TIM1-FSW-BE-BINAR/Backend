import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: {
        allow: ['com', 'net', 'id'],
      },
    })
    .required()
    .messages({
      'string.email':
        'must be a valid email & domain allowed: .com | .net | .id',
    }),
  password: Joi.string().min(8).required(),
});

export const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  password: Joi.string().min(8).required(),
});

export const seatSchema = Joi.object({
  flightId: Joi.number().required(),
  seatNumber: Joi.string().required(),
  status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE', 'LOCKED').required(),
});

export const flightSchema = Joi.object({
  price: Joi.number().min(0).required(),
  class: Joi.string().valid('ECONOMY', 'FIRST', 'BUSINESS').required(),
  flightNumber: Joi.string().required(),
  airlineId: Joi.number().positive().required(),
  departureAirport: Joi.number().positive().required(),
  arrivalAirport: Joi.number()
    .positive()
    .required()
    .custom((value, helpers) => {
      const departureAirport = helpers.state.ancestors[0].departureAirport;
      if (value === departureAirport) {
        return helpers.error('arrivalAirport.sameAsDeparture');
      }
      return value;
    }, 'Arrival airport validation')
    .messages({
      'arrivalAirport.sameAsDeparture':
        'Arrival airport must be different from departure airport.',
    }),
  departureTime: Joi.date().iso().required(),
  arrivalTime: Joi.date()
    .iso()
    .required()
    .custom((value, helpers) => {
      const departureTime = helpers.state.ancestors[0].departureTime;
      if (value <= departureTime) {
        return helpers.error('arrivalTime.beforeDeparture');
      }
      return value;
    }, 'Arrival time validation')
    .messages({
      'arrivalTime.beforeDeparture':
        'Arrival time must be after departure time.',
    }),
  terminal: Joi.string().required(),
  information: Joi.string().required(),
});

export const airportSchema = Joi.object({
  code: Joi.string().max(10).required(),
  name: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().optional(),
  country: Joi.string().required(),
  timezone: Joi.string().required(),
  latitude: Joi.string()
    .regex(/^-?\d+(\.\d+)?$/)
    .required()
    .messages({
      'string.pattern.base': 'Latitude must be a valid decimal number.',
    }),
  longitude: Joi.string()
    .regex(/^-?\d+(\.\d+)?$/)
    .required()
    .messages({
      'string.pattern.base': 'Longitude must be a valid decimal number.',
    }),
  elevation: Joi.string()
    .optional()
    .regex(/^\d+(\.\d+)?$/)
    .messages({
      'string.pattern.base': 'Elevation must be a valid decimal number.',
    }),
});

export const discountSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Discount name cannot be empty.',
    'any.required': 'Discount name is required.',
  }),

  code: Joi.string().required().messages({
    'string.empty': 'Discount code cannot be empty.',
    'any.required': 'Discount code is required.',
  }),

  description: Joi.string().optional().messages({
    'string.empty': 'Description cannot be empty.',
  }),

  type: Joi.string().valid('percentage', 'fixed').required().messages({
    'any.only': 'Discount type must be either "percentage" or "fixed".',
    'any.required': 'Discount type is required.',
  }),

  value: Joi.number().positive().required().messages({
    'number.base': 'Discount value must be a number.',
    'number.positive': 'Discount value must be greater than 0.',
    'any.required': 'Discount value is required.',
  }),

  startDate: Joi.date().iso().required().messages({
    'date.base': 'Start date must be a valid date.',
    'date.format': 'Start date must follow the ISO 8601 format.',
    'any.required': 'Start date is required.',
  }),

  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
    'date.base': 'End date must be a valid date.',
    'date.format': 'End date must follow the ISO 8601 format.',
    'date.greater': 'End date must be after the start date.',
    'any.required': 'End date is required.',
  }),

  minPurchase: Joi.number().positive().required().messages({
    'number.base': 'Minimum purchase must be a number.',
    'number.positive': 'Minimum purchase must be greater than 0.',
    'any.required': 'Minimum purchase is required.',
  }),

  isActive: Joi.boolean().required().messages({
    'boolean.base': 'Active status must be either true or false.',
    'any.required': 'Active status is required.',
  }),
});
