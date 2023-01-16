'use strict';

const { Router } = require('express');
const router = Router();
const userSchema = require('../models/user');

module.exports = function() {
  router.post('/createUser', async (req, res) => {
    try {
      const { name } = req.body;

      const createUser = await userSchema.create({ name });

      res.status(200).json({ statusCode: 200, message: `success add ${name}`, data: createUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error});
    }
  });

  router.get('/getAll', async (req, res) => {
    try {
      const getUser = await userSchema.find({});

      res.status(200).json({ statusCode: 200, message: `success`, data: getUser });      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error});      
    }
  });

  return router;
}

