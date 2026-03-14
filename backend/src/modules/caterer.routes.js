/**
 * Caterers Router
 * Handles all /api/caterers endpoints
 */

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../utils/dataStore");
const { validateCaterer, validateQueryParams } = require("../middleware/validation");

const router = express.Router();

// ─────────────────────────────────────────────
// GET /api/caterers
// Supports: search, filter, sort, pagination
// ─────────────────────────────────────────────
router.get("/", validateQueryParams, (req, res, next) => {
  try {
    let caterers = readData();

    const {
      search,
      location,
      cuisine,
      minPrice,
      maxPrice,
      minRating,
      sortBy = "rating",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    // --- Filtering ---
    if (search) {
      const query = search.toLowerCase();
      caterers = caterers.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.location.toLowerCase().includes(query)
      );
    }

    if (location) {
      caterers = caterers.filter((c) =>
        c.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (cuisine) {
      caterers = caterers.filter((c) =>
        c.cuisines.some((cu) => cu.toLowerCase().includes(cuisine.toLowerCase()))
      );
    }

    if (minPrice) {
      caterers = caterers.filter((c) => c.pricePerPlate >= Number(minPrice));
    }

    if (maxPrice) {
      caterers = caterers.filter((c) => c.pricePerPlate <= Number(maxPrice));
    }

    if (minRating) {
      caterers = caterers.filter((c) => c.rating >= Number(minRating));
    }

    // --- Sorting ---
    const validSortFields = ["rating", "pricePerPlate", "name", "reviewCount", "createdAt"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "rating";
    const sortOrder = order === "asc" ? 1 : -1;

    caterers.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });

    // --- Pagination ---
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const total = caterers.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = caterers.slice(startIndex, startIndex + limitNum);

    res.status(200).json({
      success: true,
      data: paginatedData,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
      filters: { search, location, cuisine, minPrice, maxPrice, minRating },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────
// GET /api/caterers/stats  (bonus endpoint)
// Returns aggregate statistics
// ─────────────────────────────────────────────
router.get("/stats", (req, res, next) => {
  try {
    const caterers = readData();

    if (caterers.length === 0) {
      return res.status(200).json({ success: true, data: {} });
    }

    const prices = caterers.map((c) => c.pricePerPlate);
    const ratings = caterers.map((c) => c.rating);

    const cuisineMap = {};
    caterers.forEach((c) =>
      c.cuisines.forEach((cu) => {
        cuisineMap[cu] = (cuisineMap[cu] || 0) + 1;
      })
    );

    const topCuisines = Object.entries(cuisineMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([cuisine, count]) => ({ cuisine, count }));

    const locationMap = {};
    caterers.forEach((c) => {
      const city = c.location.split(",")[0].trim();
      locationMap[city] = (locationMap[city] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalCaterers: caterers.length,
        verifiedCaterers: caterers.filter((c) => c.isVerified).length,
        averageRating: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2),
        averagePricePerPlate: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
        priceRange: { min: Math.min(...prices), max: Math.max(...prices) },
        topCuisines,
        topLocations: locationMap,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────
// GET /api/caterers/:id
// ─────────────────────────────────────────────
router.get("/:id", (req, res, next) => {
  try {
    const caterers = readData();
    const caterer = caterers.find((c) => c.id === req.params.id);

    if (!caterer) {
      const error = new Error(`Caterer with ID '${req.params.id}' not found.`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: caterer });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────
// POST /api/caterers
// ─────────────────────────────────────────────
router.post("/", validateCaterer, (req, res, next) => {
  try {
    const caterers = readData();

    // Duplicate name check
    const duplicate = caterers.find(
      (c) => c.name.toLowerCase() === req.body.name.trim().toLowerCase()
    );
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `A caterer named '${req.body.name}' already exists.`,
      });
    }

    const newCaterer = {
      id: `cat_${uuidv4().split("-")[0]}`,
      name: req.body.name.trim(),
      location: req.body.location.trim(),
      pricePerPlate: req.body.pricePerPlate,
      cuisines: req.body.cuisines.map((c) => c.trim()),
      rating: Number(req.body.rating.toFixed(1)),
      reviewCount: req.body.reviewCount || 0,
      minGuests: req.body.minGuests || null,
      maxGuests: req.body.maxGuests || null,
      description: req.body.description?.trim() || "",
      contactEmail: req.body.contactEmail?.trim() || null,
      contactPhone: req.body.contactPhone?.trim() || null,
      tags: req.body.tags || [],
      images: req.body.images || [],
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    caterers.push(newCaterer);
    const saved = writeData(caterers);

    if (!saved) {
      const error = new Error("Failed to save caterer. Please try again.");
      error.statusCode = 500;
      return next(error);
    }

    res.status(201).json({
      success: true,
      message: "Caterer registered successfully.",
      data: newCaterer,
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────
// PATCH /api/caterers/:id  (bonus endpoint)
// Partial update
// ─────────────────────────────────────────────
router.patch("/:id", (req, res, next) => {
  try {
    const caterers = readData();
    const index = caterers.findIndex((c) => c.id === req.params.id);

    if (index === -1) {
      const error = new Error(`Caterer with ID '${req.params.id}' not found.`);
      error.statusCode = 404;
      return next(error);
    }

    const immutableFields = ["id", "createdAt", "isVerified"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => !immutableFields.includes(key))
    );

    caterers[index] = {
      ...caterers[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    writeData(caterers);

    res.status(200).json({
      success: true,
      message: "Caterer updated successfully.",
      data: caterers[index],
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────
// DELETE /api/caterers/:id  (bonus endpoint)
// ─────────────────────────────────────────────
router.delete("/:id", (req, res, next) => {
  try {
    let caterers = readData();
    const index = caterers.findIndex((c) => c.id === req.params.id);

    if (index === -1) {
      const error = new Error(`Caterer with ID '${req.params.id}' not found.`);
      error.statusCode = 404;
      return next(error);
    }

    const [removed] = caterers.splice(index, 1);
    writeData(caterers);

    res.status(200).json({
      success: true,
      message: `Caterer '${removed.name}' deleted successfully.`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;