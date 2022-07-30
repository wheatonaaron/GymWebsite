import React from 'react';
import { MdDeleteForever, MdModeEdit} from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit }) {
    return (
        // iterative react row element generated for each item in the db. onClicks at the end call the edit and delete methods
        // when the user clicks on those react icons.
        <tr class="exerciseRow">
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdModeEdit onClick={ () => onEdit(exercise)}/></td>
            <td><MdDeleteForever onClick={ () => onDelete(exercise._id)}/></td>
        </tr>
    );
}

export default Exercise;