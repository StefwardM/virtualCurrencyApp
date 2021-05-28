const express = require('express');
const router = express.Router();
const transferController = require('../../../controllers/api/v1/transfer');

router.get("/history", transferController.getHistory);

module.exports = router;