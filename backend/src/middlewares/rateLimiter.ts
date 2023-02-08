const rateLimiter = require('express-rate-limit');

export const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 25, // Limit each IP to 25 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "You can't make any more requests at the moment. Try again later",
});

export const regLimiter = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // Limit each IP to 5 create account requests per `window` (here, per hour)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:
    'Too many accounts created from this IP, please try again after an hour',
});
