import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
// Almost identical to add page except used for editing, for more in depth comments please consult AddExercisePage.js
export const EditExcercisePage = ({exerciseToEdit}) => {
    console.log(exerciseToEdit)
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory()

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}
        console.log(editedExercise)
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            // Here we're using PUT instead of POST
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.status)
        if(response.status === 200){
             alert("Successfully edited the exercise!");
        } else {
             alert(`Failed to edit exercise, status code = ${response.status}`);
        }     history.push("/");
    };

    return (
        <div>
            <div class="editHeader">
            <h1>Edit Excercise</h1>
            </div>
            <div class="editRow">
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                value={weight}
                onChange={e => setWeight(e.target.value)} />

            <div class="radio" onChange={e => setUnit(e.target.value)} value={unit}>
                <input type="radio" value="lbs" name="unit" /> lbs
                <input type="radio" value="kg" name="unit" /> kg
            </div>

            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
            </div>
        </div>
    );
}

export default EditExcercisePage;