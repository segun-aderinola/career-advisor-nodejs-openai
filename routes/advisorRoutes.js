const express = require('express');
const {generateAdvice} = require('../controllers/advisorController');
const router = express.Router();


router.post('/career', generateAdvice);
// router.get('/career', getPage);


module.exports = router;