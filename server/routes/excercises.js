const router = require('express').Router();
let Excercise = require('../models/excercise.model');

/// get all excercises
router.route('/').get((req, res) => {
    Excercise.find()
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json(err));
});

/// create a excercise
router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExcercise = Excercise({userName, description, duration, date,});

    newExcercise.save()
    .then(() => res.json('Excercise added'))
    .catch(err => res.status(400).json(err));
});

/// get excercise details by id
router.route('/:id').get((req, res) => {
    Excercise.findById(req.param.id)
    .then(excercise => res.json(excercise))
    .catch(err => res.status(400).json(err));
});

/// delete a excercise
router.route('/:id').delete((req, res) => {
    Excercise.findByIdAndDelete(req.param.id)
    .then(() => res.json("excercise deleted"))
    .catch(err => res.status(400).json(err));
});

/// update a excercise
router.route('/update/:id').post((req, res) => {

    Excercise.findById(req.params.id)
    .then( excercise => {
        excercise.userName = req.body.userName;
        excercise.description = req.body.description;
        excercise.duration = Number(req.body.duration);
        excercise.date = Date.parse(req.body.date);

        excercise.save()
        .then( ()=> res.json(excercise))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));

});

module.exports = router;