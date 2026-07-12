import Joi from "joi";

export const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required(),

    email: Joi.string()
      .trim()
      .lowercase()
      .email()
      .required(),

    password: Joi.string()
      .min(6)
      .max(64)
      .required(),

    phone: Joi.string()
      .allow("")
      .optional(),

    role: Joi.string()
      .valid(
        "admin",
        "coach",
        "player",
        "viewer"
      )
      .optional(),
  }),
});

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email()
      .required(),

    password: Joi.string()
      .required(),
  }),
});

export const refreshTokenSchema = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string()
      .required(),
  }),
});
