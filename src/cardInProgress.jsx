/* jshint esversion: 6 */
import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom'; 

function CardInProgress({ readyTasks, inProgressTasks, moveTaskToInProgress }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

 
  const addTaskFromReady = (taskId) => {
    const taskToMove = readyTasks.find(task => task.id === taskId);
    if (taskToMove) {
      moveTaskToInProgress(taskId); 
      setDropdownVisible(false); 
    }
  };

  
  const toggleDropdown = () => {
    if (readyTasks.length > 0) {
      setDropdownVisible(!isDropdownVisible);
    }
  };

  return (
    <div className="cardBacklog">
      <p className="card-title">In Progress</p>

    
      {inProgressTasks.map(task => (
        <div key={task.id} className="card-task">
          <div className="card-title">
           
            <Link to={`/tasks/${task.id}`} className="card-title">{task.title}</Link>
          </div>
        </div>
      ))}

    
      <div
        className={`add-card__plus ${readyTasks.length === 0 ? 'disabled' : ''}`}
        onClick={toggleDropdown}
      >
        <img className="arrow" src="./img/add-card.png" alt="plus" />
        <p className="arrow">Add card</p>
      </div>


      {isDropdownVisible && (
        <div className="dropdown">
          {readyTasks.length === 0 ? (
            <p>Нет доступных заданий</p>
          ) : (
            readyTasks.map(task => (
              <div
                key={task.id}
                className="card-title"
                onClick={() => addTaskFromReady(task.id)}
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

export default CardInProgress;