const express = require('express');
const router = express.Router();
const transfersController = require('../../../controllers/api/v1/transfers');

router.get("/", transfersController.getAll);
router.get("/:id", transfersController.getTransferById);
router.post("/", transfersController.create);
module.exports = router;