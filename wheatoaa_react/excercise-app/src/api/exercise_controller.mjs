import * as exercises from './exercise_model.mjs';
import express from 'express';
const app = express();

const PORT = 3000;

app.use(express.json());


/**
 * Create a new Excercise with name of exercise, reps, weight, units, and date 
 */
app.post("/exercises", (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ error: 'Request failed' });
        });
});

/**
 * Allows the user to read the entire collection of exercises
 */
 app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercise(filter, '', 0)
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});

/**
 * Update the exercise parameters with whatever parameters are provided to us
 */
 app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose _id is provided in the query parameters
 */
 app.delete('/exercises/:id', (req, res) => {
    exercises.deleteExercises(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});