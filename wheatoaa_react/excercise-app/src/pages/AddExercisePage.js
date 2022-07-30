import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {
// Define the paramters associated with the excercise we're adding such as reps, weight, etc.
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory()
    // async code that fetches the new excercise we made and sends it as a JSON object, with the appropriate HTTP code based on
    // succesfully executing or failing
    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert ("Successfully added the exercise");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };
    // Input fields for each of the exercise paramters, including radio buttons for the units to ensure the user selects either lbs or kg
    return (
        <div>
            <div class="addHeader">
            <h1>Add Exercise</h1>
            </div>
            <div class="inputRow">
            <input
                type="text"
                placeholder="Enter Name of Exercise Here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter Number of Reps Here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                placeholder="Enter the Amount of Weight Per Rep"
                value={weight}
                onChange={e => setWeight(e.target.value)} />

            <div class="radio" onChange={e => setUnit(e.target.value)} value={unit}>
                <input type="radio" value="lbs" name="unit" /> lbs
                <input type="radio" value="kg" name="unit" /> kg
            </div>

            <input
                type="text"
                placeholder="Please enter the date you performed this excercise."
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
            </div>
        </div>
    );
}

export default AddExercisePage;