const Joi = require("joi");

const BookAddSchema = Joi.object({
  title: Joi.string().min(5).max(255).required().trim(),
  author: Joi.string().min(5).required().trim(),
  shortDescription: Joi.string().min(5).max(550).optional().trim(),
  longDescription: Joi.string().min(10).optional().trim(),
  year: Joi.number()
    .integer()
    .required()
    .max(new Date().getFullYear() + 1),
  price: Joi.number().required().min(0),
  isbn: Joi.string().min(10).max(10).required(),
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now)
});

const BookUpdateSchema = Joi.object({
  title: Joi.string().min(5).max(255).trim().optional(),
  author: Joi.string().min(5).trim().optional(),
  shortDescription: Joi.string().min(5).max(550).optional().trim(),
  longDescription: Joi.string().min(10).optional().trim(),
  year: Joi.number()
    .min(1000)
    .integer()
    .optional()
    .max(new Date().getFullYear() + 1),
  price: Joi.number().min(0),
  isbn: Joi.string().min(10).max(10)
});

async function AddBookValidationMiddleWare(req, res, next) {
  const bookPayload = req.body;

  try {
    await BookAddSchema.validateAsync(bookPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406
    });
  }
}

async function UpdateBookValidationMiddleWare(req, res, next) {
  const bookPayload = req.body;

  try {
    await BookUpdateSchema.validateAsync(bookPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406
    });
  }
}

module.exports = {
  AddBookValidationMiddleWare,
  UpdateBookValidationMiddleWare
};
