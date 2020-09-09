const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { validationResult } = require('express-validator');
const { WelcomeMail } = require('../mails');
const User = require('../models/User');
const sendEmail = require('../helpers/sendMail');

// @route   POST api/users
// @desc    Register User
// @access  Public
exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user =
      (await User.findOne({ email })) || (await User.findOne({ name }));

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid credentials',
          },
        ],
      });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    try {
      await sendEmail(user.email, WelcomeMail(user.name));
    } catch (error) {
      console.log(error);
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.JWT_SECRET,
      { expiresIn: config.JWT_TOKEN_EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      },
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};
