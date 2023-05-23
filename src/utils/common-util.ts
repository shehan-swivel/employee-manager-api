/**
 * Get CORS allowed origin list.
 * Allowed origins must be provide by an environment variable using ALLOWED_ORIGINS key.
 * @returns {string[]|string}
 */
export const getAllowedOrigins = (): string[] | string => {
  let origins: string[] | string = process.env.ALLOWED_ORIGINS?.split(',');

  if (origins.length === 1) {
    origins = origins[0];
  }

  return origins;
};
