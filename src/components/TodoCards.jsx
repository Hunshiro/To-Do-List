import React, { useState, useEffect } from "react";
import { Card, CardText, CardBody } from 'reactstrap';
import EditTask from "../modals/EditTask";

const TodoCards = ({ taskObj, index, deleteTodo, updateListArray }) => {
    const [modal, setModal] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState("");

    const colors = [
        { primaryColor: "rgb(77, 226, 72)", secondaryColor: "rgba(77, 226, 72, 0.315)" },
        { primaryColor: "rgb(255, 210, 60)", secondaryColor: "rgba(255, 209, 60, 0.619)" },
        { primaryColor: "#5D93E1", secondaryColor: "rgba(58, 104, 255, 0.301)" },
        { primaryColor: "rgb(255, 57, 57)", secondaryColor: "rgba(255, 57, 57, 0.424)" },
        { primaryColor: "rgb(135, 60, 255)", secondaryColor: "rgba(135, 60, 255, 0.424)" },
        { primaryColor: "rgb(255, 85, 43)", secondaryColor: "rgba(255, 85, 43, 0.424)" }
    ];

    const deleteCard = () => {
        deleteTodo(index);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const calculateTimeRemaining = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const diff = due - now;

        if (diff <= 0) {
            return "Due date passed";
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return `${days}d ${hours}h ${minutes}m remaining`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(taskObj.DueDate));
        }, 60000);  // Update every minute

        return () => clearInterval(interval);
    }, [taskObj.DueDate]);

    useEffect(() => {
        setTimeRemaining(calculateTimeRemaining(taskObj.DueDate));
    }, [taskObj.DueDate]);

    return (
        <Card className="mb-3" style={{ "borderBottom": `4px solid ${colors[index % 6].primaryColor}`, "minHeight": "250px", "marginBottom": "20px","margin":"10px" }}>
            <h5 tag="h5" className="card-header name" style={{ "backgroundColor": colors[index % 6].secondaryColor }}>{taskObj.Name}</h5>
            <CardBody>
                <CardText className="card-text desc">{taskObj.Description}</CardText>
                {taskObj.Attachments && taskObj.Attachments.length > 0 && (
                    <div className="attachments-banner">
                        {taskObj.Attachments.map((attachment, idx) => (
                            <a key={idx} href={attachment} target="_blank" rel="noopener noreferrer" className="attachment-link">
                                Attachment {idx + 1}
                            </a>
                        ))}
                    </div>
                )}
                {taskObj.DueDate && (
                    <div className="due-date">
                        <p style={{ "color": colors[index % 6].primaryColor }}>Due Date: {new Date(taskObj.DueDate).toLocaleString()}</p>
                        <p style={{ "color": colors[index % 6].primaryColor }}>{timeRemaining}</p>
                    </div>
                )}
                <div className="icons">
                    <i className="far fa-edit edit" style={{ "color": colors[index % 6].primaryColor, "cursor": "pointer", "marginRight": "10px" }} onClick={() => setModal(true)}></i>
                    <i className="fas fa-trash" style={{ "color": colors[index % 6].primaryColor, "cursor": "pointer" }} onClick={deleteCard}></i>
                </div>
            </CardBody>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </Card>
    );
};

export default TodoCards;
