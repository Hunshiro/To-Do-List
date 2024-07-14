import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTask = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');  // Added due date state
    const [priority, setPriority] = useState('');  // Added priority state

    const handleUpdateClick = (e) => {
        e.preventDefault();
        update();
        toggle();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "dueDate") {  // Handle due date change
            setDueDate(value);
        } else if (name === "priority") {  // Handle priority change
            setPriority(value);
        }
    };

    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setDueDate(taskObj.DueDate || '');  // Initialize due date
        setPriority(taskObj.Priority || '');  // Initialize priority
    }, [taskObj]);

    const update = () => {
        let editObj = {
            Name: taskName,
            Description: description,
            DueDate: dueDate,  // Include due date
            Priority: priority  // Include priority
        };
        updateTask(editObj);
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Your Todo</ModalHeader>
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
                        <label className="label">Due Date:</label>  // Added due date input
                        <input type="date" className="form-control" value={dueDate} onChange={handleChange} name="dueDate" />
                    </div>
                    <div className="form-group">
                        <label className="label">Priority:</label>  // Added priority input
                        <select className="form-control" value={priority} onChange={handleChange} name="priority">
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button className="createBtn" onClick={handleUpdateClick}>Update</Button>
                <Button className="cancelBtn" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTask;
