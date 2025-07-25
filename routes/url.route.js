const express = require('express');
const { handleCreateURL, handleRedirectRouteByShortID, handleAnalytics } = require('../controllers/url.controller');
const URL = require('./../models/url.model');
const restrictUser = require('../middlewares/auth.guard');
const router = express.Router();

router.post('/', handleCreateURL);
router.get('/:id', handleRedirectRouteByShortID);
router.get('/analytics/:id', handleAnalytics)

module.exports = router;