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
  email: Joi.string().email({
    tlds: {
      allow: ['com', 'net', 'id'],
    },
  }),
  phone: Joi.string().min(10).required(),
  password: Joi.string().min(8).required(),
});

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  familyName: Joi.string().optional(),
  phone: Joi.string().min(10).optional(),
  role: Joi.string().valid('ADMIN', 'BUYER').optional(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  familyName: Joi.string().optional(),
  phone: Joi.string().min(10).optional(),
});

export const seatSchema = Joi.object({
  flightId: Joi.number().required(),
  seatNumber: Joi.string().required(),
  status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE', 'LOCKED').required(),
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
});

export const flightSchema = Joi.object({
  price: Joi.number().min(0).required(),
  class: Joi.string()
    .valid('ECONOMY', 'FIRST', 'BUSINESS', 'PREMIUM_ECONOMY')
    .required(),
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
  image: Joi.binary()
    .optional()
    .custom((value, helpers) => {
      if (value && value.length === 0) {
        return helpers.error('any.noFileSelected'); // Error kustom
      }
      return value;
    })
    .messages({
      'binary.base': 'Image must be a file.',
      'any.noFileSelected': 'No file selected.',
    }),
});

export const airlineSchema = Joi.object({
  name: Joi.string()
    .pattern(/^(?!^\d+$).*$/, 'not only numbers') // Regex untuk memastikan string tidak hanya angka
    .required()
    .messages({
      'string.empty': 'Airline name is required.',
      'string.pattern.name': 'Airline name cannot contain only numbers.',
      'any.required': 'Airline name is required.',
    }),
  image: Joi.binary()
    .optional()
    .custom((value, helpers) => {
      if (value && value.length === 0) {
        return helpers.error('any.noFileSelected'); // Error kustom
      }
      return value;
    })
    .messages({
      'binary.base': 'Image must be a file.',
      'any.noFileSelected': 'No file selected.',
    }),
});

export const notificationSchema = Joi.object({
  type: Joi.string()
    .valid('INFO', 'DISCOUNT', 'ACCOUNT', 'EVENT', 'PAYMENT')
    .required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  isRead: Joi.boolean().required(),
  userId: Joi.number().optional(),
});

export const readNotificationSchema = Joi.object({
  notificationID: Joi.number().required(),
  isRead: Joi.boolean().required(),
});

export const QRCodeSchema = Joi.object({
  QRCodeData: Joi.object().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().min(6),
  password: Joi.string().min(8),
});

export const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().min(6),
});

export const resetOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const transactionSchema = Joi.object({
  bookingId: Joi.number().required(),
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

export const bookingSchema = Joi.object({
  userId: Joi.number().positive().required().messages({
    'number.base': 'User ID must be a number.',
    'number.positive': 'User ID must be a positive number.',
    'any.required': 'User ID is required.',
  }),
  flightId: Joi.number().positive().required().messages({
    'number.base': 'Flight ID must be a number.',
    'number.positive': 'Flight ID must be a positive number.',
    'any.required': 'Flight ID is required.',
  }),
  returnFlightId: Joi.number().positive().allow(null).messages({
    'number.base': 'Return Flight ID must be a number.',
    'number.positive': 'Return Flight ID must be a positive number.',
  }),
  bookingDate: Joi.date().iso().optional().messages({
    'date.base': 'Booking Date must be a valid date.',
    'date.iso': 'Booking Date must follow the ISO 8601 format.',
  }),
  bookingDetail: Joi.array()
    .items(
      Joi.object({
        seatId: Joi.number().positive().required().messages({
          'number.base': 'Seat ID must be a number.',
          'number.positive': 'Seat ID must be a positive number.',
          'any.required': 'Seat ID is required.',
        }),
        price: Joi.number().positive().required().messages({
          'number.base': 'Price must be a number.',
          'number.positive': 'Price must be greater than 0.',
          'any.required': 'Price is required.',
        }),
        passenger: Joi.object({
          name: Joi.string().required().messages({
            'string.base': 'Name must be a string.',
            'any.required': 'Name is required.',
          }),
          familyName: Joi.string().required().messages({
            'string.base': 'Family Name must be a string.',
            'any.required': 'Family Name is required.',
          }),
          gender: Joi.string().valid('MALE', 'FEMALE').required().messages({
            'string.base': 'Gender must be a string.',
            'any.only': 'Gender must be either "MALE" or "FEMALE".',
            'any.required': 'Gender is required.',
          }),
          identityNumber: Joi.string()
            .length(16)
            .required()
            .messages({
              'string.base': 'Identity Number must be a string.',
              'string.length': 'Identity Number must be exactly 16 characters long.',
              'any.required': 'Identity Number is required.',
            }),
          citizenship: Joi.string()
            .valid('Indonesia')
            .required()
            .messages({
              'string.base': 'Citizenship must be a string.',
              'any.only': 'Citizenship must be "Indonesia".',
              'any.required': 'Citizenship is required.',
            }),
          countryOfIssue: Joi.string().required().messages({
            'string.base': 'Country of Issue must be a string.',
            'any.required': 'Country of Issue is required.',
          }),
          title: Joi.string().valid('Mr', 'Mrs').required().messages({
            'string.base': 'Title must be a string.',
            'any.only': 'Title must be either "Mr" or "Mrs".',
            'any.required': 'Title is required.',
          }),
          dob: Joi.date().iso().required().messages({
            'date.base': 'Date of Birth must be a valid date.',
            'date.iso': 'Date of Birth must follow the ISO 8601 format.',
            'any.required': 'Date of Birth is required.',
          }),
          expiredDate: Joi.date().iso().required().messages({
            'date.base': 'Expired Date must be a valid date.',
            'date.iso': 'Expired Date must follow the ISO 8601 format.',
            'any.required': 'Expired Date is required.',
          }),
          type: Joi.string()
            .valid('BABY', 'CHILD', 'ADULT')
            .required()
            .messages({
              'string.base': 'Passenger Type must be a string.',
              'any.only': 'Passenger Type must be one of "BABY", "CHILD", or "ADULT".',
              'any.required': 'Passenger Type is required.',
            }),
        }).required(),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Booking Details must be an array.',
      'array.min': 'Booking Details must have at least one item.',
      'any.required': 'Booking Details are required.',
    }),
  });
