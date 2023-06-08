const express = require('express');
const cors = require('cors');

const {generateAdvice} = require('../controllers/advisorController');
const router = express.Router();


router.post('/career', cors(), generateAdvice);
// router.get('/career', getPage);


module.exports = router;