import React, {FC} from "react";
import styled from 'styled-components';
import Note from "./Note";

const AppContainer = styled.div`
  text-align: center;
  background-color: inherit;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: black;
`;

const NotesContainer = styled.div`
  width: 80%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
`;

export interface NoteType {
    id: number;
    title: string;
    content: string;
}

interface TodoListComponentProps {
    todoList: NoteType[];
    onAddNote: (note: NoteType) => void;
    onDeleteNote: (id: number) => void;
}

const TodoListComponent: FC<TodoListComponentProps> = ({todoList, onDeleteNote}) => {

    return (
        <AppContainer>
            <NotesContainer>
                {todoList.map((noteItem) => (
                    <Note
                        key={noteItem.id}
                        id={noteItem.id}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={onDeleteNote}
                    />
                ))}
            </NotesContainer>
        </AppContainer>
    );
};

export default TodoListComponent;
