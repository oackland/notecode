import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface NoteProps {
    id: number;
    title: string;
    content: string;
    onDelete: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({id, title, content, onDelete}) => {
    function handleClick() {
        onDelete(id);
    }

    return (
        <div className="note">
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={handleClick}>
                <DeleteIcon/>
            </button>
        </div>
    );
}

export default Note;
