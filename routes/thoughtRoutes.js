const router = require('express').Router();
const {getThoughts, getSingleThought, createThought, deleteThought, updateThought} = require('../controllers/thoughtController');


module.exports = router;