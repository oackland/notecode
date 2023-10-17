import React from 'react';

interface Todo {
    id: string;
    task: string;
    completed: boolean;
}

interface TodoCardProps {
    todo: Todo;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({todo, toggleTodo, deleteTodo}) => {
    return (
        <li key={todo.id} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            {todo.task}
            <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoCard;
