var express = require('express');
var router = express.Router();
const Bird = require('../models/bird');
const authMiddleware = require('../middleware/auth');
const excel = require('exceljs');

router.get('/', authMiddleware.ensureAuthenticated, async function (req, res, next) {

  let birds = await Bird.find();
  res.render('birds/index', { birdData: birds });
});

router.get('/excel-export', authMiddleware.ensureAuthenticated, async function (req, res, next) {
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Birds');

  let birds = await Bird.find({ status: 'Alive'});

  worksheet.columns = [
    { header: 'Species', key: 'species', width: 20 },
    { header: 'NickName', key: 'nickName', width: 30 },
    { header: 'Status', key: 'status', width: 10 }
  ];

  worksheet.addRows(birds);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader(
    'Content-Disposition',
    'attachment;filename=birds.xlsx',
  );
  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });


});

router.get('/csv-export', authMiddleware.ensureAuthenticated, async function (req, res, next) {
  let birds = await Bird.find().sort({ species: 'asc'});

  let csv = 'Species,NickName,Status\n';

  for (let bird of birds) {
    csv += `${bird.species},${bird.nickName},${bird.status}\n`;
  }

  res.header('Content-Type', 'text/csv');
  res.attachment('output.csv');
  return res.send(csv);
});


router.post('/create', authMiddleware.ensureAuthenticated, async function (req, res, next) {
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

  res.redirect('/birds');
});

router.get('/update', authMiddleware.ensureAuthenticated, async function (req, res) {
  let id = req.query._id;

  let bird = await Bird.findById(id);

  res.render('birds/edit', { birdData: bird });
});

router.post('/update', authMiddleware.ensureAuthenticated, async function (req, res) {
  let id = req.body._id;

  await Bird.findOneAndUpdate({ _id: id }, {
    species: req.body.species,
    nickName: req.body.nickName,
    status: req.body.status
  });

  res.redirect('/birds');
});


router.get('/delete', authMiddleware.ensureAuthenticated, async function (req, res) {

  let id = req.query._id;

  await Bird.findByIdAndDelete(id);

  res.redirect('/birds');
});

module.exports = router;
