'use strict';

const { Router } = require('express');
const router = Router();
const userSchema = require('../models/user');

module.exports = function() {
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const userData = await userSchema.findById({ _id: id });
      if (userData == null) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      const profiles =
      {
        "id": id,
        "name": userData.name,
        "description": "your beloved backend engineer.",
        "mbti": "ISFJ",
        "enneagram": "9w3",
        "variant": "sp/so",
        "tritype": 725,
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "../public/static/photoProfileLinkedIn.jpg",
      };

      res.render('profile_template', {
        profile: profiles,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });

  return router;
}

