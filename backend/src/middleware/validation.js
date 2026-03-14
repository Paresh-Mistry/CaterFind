/**
 * Validation Middleware
 * Centralized input validation for all API routes
 */

const VALID_CUISINES = [
  "Indian", "Mughlai", "Rajasthani", "North Indian", "South Indian",
  "Punjabi", "Hyderabadi", "Biryani", "Kebabs", "Seafood", "Chettinad",
  "Chinese", "Italian", "Continental", "Mediterranean", "Health Food",
  "International", "Vegan", "Vegetarian"
];

/**
 * Validates POST /api/caterers request body
 */
const validateCaterer = (req, res, next) => {
  const errors = [];
  const { name, location, pricePerPlate, cuisines, rating, minGuests, maxGuests } = req.body;

  // Required field checks
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("'name' is required and must be at least 2 characters.");
  }

  if (!location || typeof location !== "string" || location.trim().length < 2) {
    errors.push("'location' is required (e.g., 'Mumbai, Maharashtra').");
  }

  if (pricePerPlate === undefined || pricePerPlate === null) {
    errors.push("'pricePerPlate' is required.");
  } else if (typeof pricePerPlate !== "number" || pricePerPlate <= 0) {
    errors.push("'pricePerPlate' must be a positive number.");
  } else if (pricePerPlate > 100000) {
    errors.push("'pricePerPlate' cannot exceed ₹1,00,000.");
  }

  if (!cuisines || !Array.isArray(cuisines)) {
    errors.push("'cuisines' must be a non-empty array of strings.");
  } else if (cuisines.length === 0) {
    errors.push("'cuisines' array cannot be empty.");
  } else if (cuisines.some((c) => typeof c !== "string" || c.trim().length === 0)) {
    errors.push("Each cuisine must be a non-empty string.");
  }

  if (rating === undefined || rating === null) {
    errors.push("'rating' is required.");
  } else if (typeof rating !== "number" || rating < 1 || rating > 5) {
    errors.push("'rating' must be a number between 1 and 5.");
  }

  // Optional but validated if provided
  if (minGuests !== undefined && (typeof minGuests !== "number" || minGuests < 1)) {
    errors.push("'minGuests' must be a positive integer.");
  }

  if (maxGuests !== undefined && (typeof maxGuests !== "number" || maxGuests < 1)) {
    errors.push("'maxGuests' must be a positive integer.");
  }

  if (minGuests !== undefined && maxGuests !== undefined && minGuests > maxGuests) {
    errors.push("'minGuests' cannot be greater than 'maxGuests'.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

/**
 * Validates query parameters for GET /api/caterers
 */
const validateQueryParams = (req, res, next) => {
  const errors = [];
  const { minPrice, maxPrice, minRating, page, limit } = req.query;

  if (minPrice && isNaN(Number(minPrice))) {
    errors.push("'minPrice' must be a valid number.");
  }

  if (maxPrice && isNaN(Number(maxPrice))) {
    errors.push("'maxPrice' must be a valid number.");
  }

  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    errors.push("'minPrice' cannot be greater than 'maxPrice'.");
  }

  if (minRating && (isNaN(Number(minRating)) || Number(minRating) < 1 || Number(minRating) > 5)) {
    errors.push("'minRating' must be between 1 and 5.");
  }

  if (page && (isNaN(Number(page)) || Number(page) < 1)) {
    errors.push("'page' must be a positive integer.");
  }

  if (limit && (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)) {
    errors.push("'limit' must be between 1 and 100.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid query parameters",
      errors,
    });
  }

  next();
};

module.exports = { validateCaterer, validateQueryParams };