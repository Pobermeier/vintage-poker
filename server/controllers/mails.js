const { templates, templateList } = require('../mails/templateList');

// @route   GET api/mails
// @desc    Get a list of transactional templates
// @access  Public
exports.getMailTemplateList = (req, res) => {
  if (req.query.format === 'html') {
    res.send(templateList);
  } else {
    res.json(templates);
  }
};

// @route   GET api/mails/:id
// @desc    Get transactional template by Id
// @access  Public
exports.getTemplateById = (req, res) => {
  const foundTemplate = templates.find(
    (template) => template.id == req.params.id,
  );

  if (foundTemplate) {
    return res.status(200).send(foundTemplate.html);
  } else {
    return res.status(404).send('No template found with this id');
  }
};
