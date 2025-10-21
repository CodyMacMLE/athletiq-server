// src/routes/api/index.js

/**
 * The main entry-point for the v1 version of the fragments API.
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();

// Define our first route, which will be: GET /api/fragments
router.get('/fragments', require('./get'));
// Other routes (POST, DELETE, etc.) will go here later on...

module.exports = router;
