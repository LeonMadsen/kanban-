/* jshint esversion: 6 */
import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom'; 

function CardReady({ backlogTasks, readyTasks, moveTaskToReady, moveTaskToInProgress }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false); 

 
  const addTaskFromBacklog = (taskId) => {
    const taskToMove = backlogTasks.find((task) => task.id === taskId);
    if (taskToMove) {
      moveTaskToReady(taskId); 
      setDropdownVisible(false); 
    }
  };

 
  const toggleDropdown = () => {
    if (backlogTasks.length > 0) {
      setDropdownVisible(!isDropdownVisible);
    }
  };

  return (
    <div className="cardBacklog">
      <p className="card-title">Ready</p>

  
      {readyTasks.map((task) => (
        <div key={task.id} className="card-task">
          <div className="card-title">
             <Link to={`/tasks/${task.id}`} className="card-title">{task.title}</Link>
          </div>
        </div>
      ))}

      
      <div
        className={`add-card__plus ${backlogTasks.length === 0 ? 'disabled' : ''}`}
        onClick={toggleDropdown}
      >
        <img className="arrow" src="./img/add-card.png" alt="plus" />
        <p className="arrow">Add card</p>
      </div>

   
      {isDropdownVisible && (
        <div className="dropdown">
          {backlogTasks.length === 0 ? (
            <p>Нет заданий</p>
          ) : (
            backlogTasks.map((task) => (
              <div
                key={task.id}
                className="card-title"
                onClick={() => addTaskFromBacklog(task.id)}
              >
                {task.title}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CardReady;