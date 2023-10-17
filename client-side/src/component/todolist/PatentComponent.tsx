import React, {useState} from "react";
import TodoListComponent from "./TodoListComponent";
import {NoteType} from "./TodoListComponent";

const ParentComponent: React.FC = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const addNote = (note: NoteType) => {
        const newNote = {...note, id: Math.random()};
        setNotes(prevNotes => [...prevNotes, newNote]);
    };

    const deleteNote = (id: number) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };


    return (
        <div>
            <TodoListComponent
                todoList={notes}
                onAddNote={addNote}
                onDeleteNote={deleteNote}
            />
        </div>
    );
};

export default ParentComponent;
