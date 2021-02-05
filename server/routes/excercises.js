const router = require('express').Router();
let Excercise = require('../models/excercise.model');

router.route('/').get((req, res) => {
    Excercise.find()
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExcercise = Excercise({userName, description, duration, date,});

    newExcercise.save()
    .then(() => res.json('Excercise added'))
    .catch(err => res.status(400).json('Error : ' + err));
});

module.exports = router;