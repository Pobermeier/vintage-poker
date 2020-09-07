const express = require('express');
const router = express.Router();
const {
  getMailTemplateList,
  getTemplateById,
} = require('../../controllers/mails');

router.get('/', getMailTemplateList);
router.get('/:id', getTemplateById);

module.exports = router;
