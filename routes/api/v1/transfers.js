const express = require('express');
const router = express.Router();
const transferController = require('../../../controllers/api/v1/transfers');

router.get("/", transferController.getAll);

router.post("/", transferController.create);

module.exports = router;