/* jshint esversion: 6 */
import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom'; 

function CardFinished({ inProgressTasks, finishedTasks, setFinishedTasksCount, moveTaskToFinished }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setFinishedTasksCount(finishedTasks ? finishedTasks.length : 0);
  }, [finishedTasks, setFinishedTasksCount]);

  const addTaskFromInProgress = (taskId) => {
    const taskToMove = inProgressTasks.find(task => task.id === taskId);
    if (taskToMove) {
      moveTaskToFinished(taskId); 
      setDropdownVisible(false); 
    }
  };

  const toggleDropdown = () => {
    if (inProgressTasks.length > 0) {
      setDropdownVisible(!isDropdownVisible);
    }
  };

  return (
    <div className="cardBacklog">
      <p className="card-title">Finished</p>

      {finishedTasks.length > 0 && (
        finishedTasks.map(task => (
          <div key={task.id} className="card-task">
            <div className="card-title">
              <Link to={`/tasks/${task.id}`} className="card-title">{task.title}</Link>
            </div>
          </div>
        ))
      )}

 
      <div
        className={`add-card__plus ${inProgressTasks.length === 0 ? 'disabled' : ''}`}
        onClick={toggleDropdown}
      >
        <img className="arrow" src="./img/add-card.png" alt="plus" />
        <p className="arrow">Add card</p>
      </div>

    
      {isDropdownVisible && (
        <div className="dropdown">
          {inProgressTasks.length === 0 ? (
            <p>Нет доступных заданий</p>
          ) : (
            inProgressTasks.map(task => (
              <div
                key={task.id}
                className="card-title"
                onClick={() => addTaskFromInProgress(task.id)}
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

export default CardFinished;