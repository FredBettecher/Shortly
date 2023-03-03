import joi from "joi";

export const urlSchema = joi.object({
    url: joi.string().uri().required()
});

export const shortUrlSchema = joi.object({
    shortUrl: joi.string().max(10).required()
});