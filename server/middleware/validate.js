const Joi = require('joi');
const { AppError } = require('./errorHandler');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return next(new AppError(errorMessage, 400));
    }

    next();
  };
};

// Common validation schemas
const schemas = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
    name: Joi.string().required().messages({
      'any.required': 'Name is required',
    }),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  }),

  listing: Joi.object({
    title: Joi.string().min(5).max(100).required().messages({
      'string.min': 'Title must be at least 5 characters long',
      'string.max': 'Title must not exceed 100 characters',
      'any.required': 'Title is required',
    }),
    description: Joi.string().min(20).max(2000).required().messages({
      'string.min': 'Description must be at least 20 characters long',
      'string.max': 'Description must not exceed 2000 characters',
      'any.required': 'Description is required',
    }),
    price: Joi.number().positive().required().messages({
      'number.positive': 'Price must be a positive number',
      'any.required': 'Price is required',
    }),
    address: Joi.string().required().messages({
      'any.required': 'Address is required',
    }),
    city: Joi.string().required().messages({
      'any.required': 'City is required',
    }),
    category: Joi.string().required().messages({
      'any.required': 'Category is required',
    }),
  }),

  booking: Joi.object({
    listingId: Joi.number().integer().positive().required(),
    startDate: Joi.date().iso().min('now').required().messages({
      'date.min': 'Start date cannot be in the past',
      'any.required': 'Start date is required',
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
      'date.greater': 'End date must be after start date',
      'any.required': 'End date is required',
    }),
  }),

  review: Joi.object({
    rating: Joi.number().integer().min(1).max(5).required().messages({
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must not exceed 5',
      'any.required': 'Rating is required',
    }),
    comment: Joi.string().min(10).max(500).required().messages({
      'string.min': 'Comment must be at least 10 characters long',
      'string.max': 'Comment must not exceed 500 characters',
      'any.required': 'Comment is required',
    }),
  }),
};

module.exports = { validate, schemas };
