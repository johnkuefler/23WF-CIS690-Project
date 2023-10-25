var express = require('express');
var router = express.Router();
const Bird = require('../models/bird');

/* GET home page. */
router.get('/', async function (req, res, next) {

  let birds = await Bird.find();

  res.render('index', { birdData: birds });
});

router.post('/', async function (req, res, next) {
  let newBird = new Bird(
    {
      species: req.body.species,
      nickName: req.body.nickName,
      status: req.body.status
    }
  );

  try {
    await newBird.save();
  } catch (err) {
    console.log(err);
  }

  res.redirect('/');
});

router.get('/delete', async function(req,res){

  let id = req.query._id;

  await Bird.findByIdAndDelete(id);

  res.redirect('/');

});

module.exports = router;
