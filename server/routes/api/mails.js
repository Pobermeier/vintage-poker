const express = require('express');
const router = express.Router();

const { templates, templateList } = require('../../mails/templateList');

router.get('/', (req, res) => {
  res.send(templateList);
});

router.get('/:id', (req, res) => {
  const foundTemplate = templates.find(
    (template) => template.id == req.params.id,
  );

  if (foundTemplate) {
    return res.status(200).send(foundTemplate.html);
  } else {
    return res.status(404).send('No template found with this id');
  }
});

module.exports = router;
