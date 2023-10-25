var express = require('express');
var router = express.Router();
const Bird = require('../models/bird');

/* GET home page. */
router.get('/', async function (req, res, next) {

  // let newBird = new Bird(
  //   {
  //     species: 'Parrot',
  //     nickName: 'Something',
  //     status: 'Dead'
  //   }
  // );

  // try {
  //   await newBird.save();
  // } catch (err) {
  //   console.log(err);
  // }


  let birds = await Bird.find();

  res.render('index', { birdData: birds });
});

module.exports = router;
