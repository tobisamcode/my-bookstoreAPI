const { date } = require("joi");
const Joi = require("joi");

const BookSchema = Joi.object({
  title: Joi.string().min(5).max(255).required().trim(),
  author: Joi.string().min(5).required().trim(),
  shortDescription: Joi.string().min(5).max(550).optional().trim(),
  longDescription: Joi.string().min(10).optional().trim(),
  year: Joi.number().integer().required().max(new Date().getFullYear()),
  price: Joi.number().required().min(0),
  isbn: Joi.string().min(10).max(10).required(),
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now)
});

async function BookValidationMiddleWare(req, res, next) {
  const bookPayload = req.body;

  try {
    await BookSchema.validateAsync(bookPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406
    });
  }
}

module.exports = BookValidationMiddleWare;
