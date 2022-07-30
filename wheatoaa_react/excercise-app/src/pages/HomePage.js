import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    // Call history import as that will be used to return us to the front page of the SPA
    const history = useHistory();

    const [exercises, setExercises] = useState([]);
    // Method to assist in deleting an exercise, fetches the exercise to be deleted and passes it
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
	        console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
    }

    }
    // Method that edits an exercise then uses history to return to the main page
    const onEdit = async exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }
    // Method that is called to list all the currently active exercises in the db
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <div class="listHeader">
            <h2>List of Exercises</h2>
            </div>
            <ExerciseList exercises={exercises} 
            // Pass exercises, as well as the methods for deleting and editing values down
                    onDelete={onDelete}
                    onEdit={onEdit}>
            </ExerciseList>
            <div class="addLink">
            <Link to="/add-exercise">Add an Exercise</Link>
            </div>
        </>
    );
}

export default HomePage;