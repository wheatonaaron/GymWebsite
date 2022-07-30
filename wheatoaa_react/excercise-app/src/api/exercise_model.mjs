// Get the mongoose object
import mongoose from 'mongoose';

// Establish the exercises database for this project
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;

// Confirmation that database connection has been established.
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

/**
 * Establish Schema for "exercise"
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: String, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model for Exercise
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create Exercise
 * @param {String} name 
 * @param {Number} reps 
 * @param {String} weight 
 * @param {String} unit
 * @param {String} date
 * @returns Return promise that resolves to the document that was saved.
 */

const createExercise = async (name, reps, weight, unit, date) => {
    // Call Constructor to make a new Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to generate document in mongoDB
    return exercise.save();
}

/**
 * Retrive users based on filter, projection, and limit parameters fed to the function
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
const findExercise = async (filter, projection, limit) => {
    const query = Exercise.find();
    if(filter.length > 0){
        query.and(filter)
        query.select(projection)
        query.limit(limit)
    }
    else {
        query.select(projection)
        query.limit(limit)
    }
    return query.exec();
}

/**
 * Replace the properties of an Exercise with a new set of properties
 * @param {String} name 
 * @param {Number} reps 
 * @param {String} weight 
 * @param {String} unit
 * @param {String} date
 * @returns
 */
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date });
        return result.modifiedCount;
}


/**
 * Delete the Exercise based off the given id number
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} reps 
 * @param {String} weight 
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteExercises = async (_id) => {
    const result = await Exercise.remove({_id});
    // Return count of deleted document
    return result.deletedCount;
}
// Export these objects to the controller file
export { createExercise, findExercise, replaceExercise, deleteExercises };