/* jshint esversion: 6 */
import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom'; 

function CardBacklog({ setActiveTasksCount, backlogTasks, setBacklogTasks }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isInputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    setActiveTasksCount(backlogTasks.length); 
  }, [backlogTasks, setActiveTasksCount]);

  const addNewTask = () => {
    if (newTaskTitle.trim() === '') return;


  const newTask = { id: Date.now(), title: newTaskTitle, description: '' }; 
  setBacklogTasks([...backlogTasks, newTask]);
  setNewTaskTitle('');
  setInputVisible(false);
};


  const toggleInputField = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className="cardBacklog">
      <p className="card-title">Backlog</p>
      
      {backlogTasks.map((task) => (
        <div key={task.id} className="card-task">
          <div className="card-title">
             <Link to={`/tasks/${task.id}`} className="card-title">{task.title}</Link>
          </div>
        </div>
      ))}
      
      {isInputVisible && (
        <div className="card-task">
          <input
            type="text"
            placeholder="_______________________________"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </div>
      )}
      
      <div className="add-card__plus" onClick={isInputVisible ? addNewTask : toggleInputField}>
        {!isInputVisible ? (
          <>
            <img className="arrow" src="./img/add-card.png" alt="plus" />
            <p className="arrow">Add card</p>
          </>
        ) : (
          <button className="submit">Submit</button>
        )}
      </div>
    </div>
  );
}

export default CardBacklog;