import React, {ChangeEvent, FC, useState} from "react";
import Modal from'../modal/FormModal'
import '/public/css/Navbar.css'
import styled from "@emotion/styled";

const StyledInput = styled.input`
  display: flex;
  background-color: #1e2127;
  border: 4px solid;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.8), 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-image-source: linear-gradient(45deg, #ff6ec4, #7873f5, #33f0c8, #fe904d);
  border-image-slice: 1;
  color: white;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  margin: 0 20px;
`;

interface TaskForm {
    name: string;
    description: string;
    dueDate: string;
}

interface CommandInputProps {
    value: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}


const CommandInput: FC<CommandInputProps> = ({onInputChange, value}) => {
    const [taskForm, setTaskForm] = useState<TaskForm>({
        name: '',
        description: '',
        dueDate: ''
    });

    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setTaskForm(prev => ({...prev, [name]: value}));
    };



    const handleTaskSubmit = () => {
        console.log(taskForm);
        setShowModal(false);
        setTaskForm({name: '', description: '', dueDate: ''});
    }

    const handleCommandSubmit = async () => {
        const commandToSend = value;
        try {
            const response = await fetch('http://localhost:5000/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({command: commandToSend})
            });

            const data = await response.json();

            if (data.action === 'add_task') {
                setShowModal(true);
            } else {
                console.error('Unknown action');
            }
        } catch (err) {
            console.error('Error executing command', err);
        }
    };

    return (
        <div>
            <StyledInput
                className={'commandInput'}
                value={value}
                onChange={onInputChange}
                onKeyDown={e => {
                    if (e.code === "Enter") {
                        handleCommandSubmit();
                        e.preventDefault();
                    }
                }}
            />

            <Modal show={showModal} onClose={() => setShowModal(false)}>

                    <header className={'modalHeader'}>
                <h2>Add Task</h2>
                        <button className={'closeButton'} onClick={() => setShowModal(false)}>X</button>
                    </header>
                <section className={'body'}>

                    <form className={'modal-form'}>
                        <div className={'formDiv'}>
                            <label>Task Name: </label>
                            <input
                                type="text"
                                name="name"
                                value={taskForm.name}
                                onChange={handleInputChange}
                                className={'formInput'}
                            />
                        </div>
                        <div>
                            <label>Description: </label>
                            <textarea
                                name="description"
                                value={taskForm.description}
                                onChange={handleInputChange}
                                className={'formInput formTextArea'}
                            />
                        </div>
                        <div>
                            <label>Due Date: </label>
                            <input
                                type="date"
                                name="dueDate"
                                value={taskForm.dueDate}
                                onChange={handleInputChange}
                                className={'formInput '}
                            />
                        </div>


                    <button type="button" onClick={handleTaskSubmit}>Add Task</button>
                    </form>
                </section>
            </Modal>
                </div>


    );
}

export default CommandInput;
