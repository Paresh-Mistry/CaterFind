/**
 * Catering Platform API Server
 * ────────────────────────────
 * Production-ready Express server with:
 * - Security headers (Helmet)
 * - Rate limiting
 * - Request logging (Morgan)
 * - CORS
 * - Centralized error handling
 * - Health check endpoint
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const catererRoutes = require("./modules/caterer.routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// Security Middleware
// ─────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─────────────────────────────────────────────
// Rate Limiting  (100 req / 15 min per IP)
// ─────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
});
app.use("/api", limiter);

// ─────────────────────────────────────────────
// Request Parsing & Logging
// ─────────────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "Catering Platform API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ─────────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────────
app.use("/api/caterers", catererRoutes);

// Root info
app.get("/", (req, res) => {
  res.status(200).json({
    service: "Catering Platform API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      listCaterers: "GET /api/caterers",
      getCatererById: "GET /api/caterers/:id",
      createCaterer: "POST /api/caterers",
      updateCaterer: "PATCH /api/caterers/:id",
      deleteCaterer: "DELETE /api/caterers/:id",
      stats: "GET /api/caterers/stats",
    },
    queryParams: {
      search: "Full-text search on name, location, description",
      location: "Filter by city/state",
      cuisine: "Filter by cuisine type",
      minPrice: "Minimum price per plate",
      maxPrice: "Maximum price per plate",
      minRating: "Minimum rating (1-5)",
      sortBy: "rating | pricePerPlate | name | reviewCount | createdAt",
      order: "asc | desc",
      page: "Page number (default: 1)",
      limit: "Results per page (default: 10, max: 100)",
    },
  });
});

// ─────────────────────────────────────────────
// Error Handling (must be last)
// ─────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`\n🍽️  Catering Platform API`);
  console.log(`   ► Local:   http://localhost:${PORT}`);
  console.log(`   ► Health:  http://localhost:${PORT}/health`);
  console.log(`   ► Docs:    http://localhost:${PORT}/\n`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

module.exports = app; // Export for testing