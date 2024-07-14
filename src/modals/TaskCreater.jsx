import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const TaskCreator = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [attachments, setAttachments] = useState([]);  // Added attachments state

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "dueDate") {
            setDueDate(value);
        } else if (name === "priority") {
            setPriority(value);
        }
    };

    const handleFileChange = (e) => {
        setAttachments([...e.target.files].map(file => URL.createObjectURL(file)));  // Handle file changes
    };

    const saveTask = () => {
        let taskObj = {
            Name: taskName,
            Description: description,
            DueDate: dueDate,
            Priority: priority,
            Attachments: attachments  // Include attachments
        };
        save(taskObj);
        setTaskName('');
        setDescription('');
        setDueDate('');
        setPriority('');
        setAttachments([]);  // Reset attachments
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Your Todo</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label className="label">Task Name:</label>
                        <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                    </div>
                    <div className="form-group">
                        <label className="label">Description:</label>
                        <textarea className="form-control" rows="5" value={description} onChange={handleChange} name="description"></textarea>
                    </div>
                    <div className="form-group">
                        <label className="label">Due Date:</label>
                        <input type="date" className="form-control" value={dueDate} onChange={handleChange} name="dueDate" />
                    </div>
                    <div className="form-group">
                        <label className="label">Priority:</label>
                        <select className="form-control" value={priority} onChange={handleChange} name="priority">
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Attachments:</label>
                        <input type="file" className="form-control" onChange={handleFileChange} multiple />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button className="createBtn" onClick={saveTask}>Create</Button>
                <Button className="cancelBtn" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default TaskCreator;
