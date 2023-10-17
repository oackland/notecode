import React, {useState, ChangeEvent, FormEvent} from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

interface Note {
    title: string;
    content: string;
}

interface CreateAreaProps {
    onAdd: (note: Note) => void,
}

const CreateArea: React.FC<CreateAreaProps> = ({ onAdd }) => {
    const [note, setNote] = useState<Note>({title: "", content: ""});

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }));
    };

    const submitNote = (event: FormEvent) => {
        event.preventDefault();
        onAdd(note);
        setNote({title: "", content: ""});
    };

    return (
        <div>
            <form className="create-note" onSubmit={submitNote}>
                <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                />
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={3}
                />
                <Zoom in={true}>
                    <Fab type="submit">
                        <AddIcon/>
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
};

export default CreateArea;
