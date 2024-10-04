/* jshint esversion: 6 */ 
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskDetail from './taskDetail'; 
import CardBacklog from './cardTask';
import CardReady from './cardReady';
import CardInProgress from './cardInProgress';
import CardFinished from './cardFinished';



function App() {
  const [isUserInfoVisible, setUserInfoVisible] = useState(false);
  const [isArrowRotated, setArrowRotated] = useState(false);

  
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [readyTasks, setReadyTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [finishedTasksCount, setFinishedTasksCount] = useState(0);

  
  useEffect(() => {
    const savedBacklogTasks = JSON.parse(localStorage.getItem('backlogTasks')) || [];
    const savedReadyTasks = JSON.parse(localStorage.getItem('readyTasks')) || [];
    const savedInProgressTasks = JSON.parse(localStorage.getItem('inProgressTasks')) || [];
    const savedFinishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];

    setBacklogTasks(savedBacklogTasks);
    setReadyTasks(savedReadyTasks);
    setInProgressTasks(savedInProgressTasks);
    setFinishedTasks(savedFinishedTasks);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('backlogTasks', JSON.stringify(backlogTasks));
    localStorage.setItem('readyTasks', JSON.stringify(readyTasks));
    localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));
    localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));
  }, [backlogTasks, readyTasks, inProgressTasks, finishedTasks]);

  const toggleUserInfo = () => {
    setUserInfoVisible(!isUserInfoVisible);
    setArrowRotated(!isArrowRotated);
  };


  const moveTaskToReady = (taskId) => {
    const taskToMove = backlogTasks.find(task => task.id === taskId);
    if (taskToMove) {
      setBacklogTasks(backlogTasks.filter(task => task.id !== taskId));
      setReadyTasks([...readyTasks, taskToMove]);
    }
  };


  const moveTaskToInProgress = (taskId) => {
    const taskToMove = readyTasks.find(task => task.id === taskId);
    if (taskToMove) {
      setReadyTasks(readyTasks.filter(task => task.id !== taskId));
      setInProgressTasks([...inProgressTasks, taskToMove]);
    }
  };


  const moveTaskToFinished = (taskId) => {
    const taskToMove = inProgressTasks.find(task => task.id === taskId);
    if (taskToMove) {
      setInProgressTasks(inProgressTasks.filter(task => task.id !== taskId));
      setFinishedTasks([...finishedTasks, taskToMove]);
    }
  };

  return (
    <Router>
    <div>
    
      <header className="header">
        <h1 className="header-title">Awesome Kanban Board</h1>
        <div className="header-user">
          <div className="user-menu" onClick={toggleUserInfo}>
            <img className="avatar" src="./img/user-avatar.png" alt="avatar" />
            <img className={`arrow ${isArrowRotated ? 'rotate' : ''}`} src="./img/arrow-down.png" alt="arrow" />
          </div>
          <div className={`user-info ${isUserInfoVisible ? 'show' : ''}`}>
            <img className="rect" src="./img/rect.png" alt="rect" />
            <div className="profile">
              <p className="profile-text arrow">Profile</p>
              <p className="profile-text arrow">Log Out</p>
            </div>
          </div>
        </div>
      </header>

      
      <main>
  <Routes>

    <Route path="/" element={
      <>
        <CardBacklog 
          setActiveTasksCount={setActiveTasksCount} 
          backlogTasks={backlogTasks} 
          setBacklogTasks={setBacklogTasks} 
        />
        <CardReady 
          backlogTasks={backlogTasks} 
          readyTasks={readyTasks} 
          moveTaskToReady={moveTaskToReady} 
          moveTaskToInProgress={moveTaskToInProgress} 
        />
        <CardInProgress 
          readyTasks={readyTasks} 
          inProgressTasks={inProgressTasks} 
          moveTaskToInProgress={moveTaskToInProgress} 
          moveTaskToFinished={moveTaskToFinished} 
        />
        <CardFinished 
          inProgressTasks={inProgressTasks} 
          finishedTasks={finishedTasks} 
          setFinishedTasksCount={setFinishedTasksCount} 
          moveTaskToFinished={moveTaskToFinished} 
        />
      </>
    } />


    <Route path="/tasks/:taskId" element={<TaskDetail 
      backlogTasks={backlogTasks} 
      readyTasks={readyTasks} 
      inProgressTasks={inProgressTasks} 
      finishedTasks={finishedTasks} 
    />} />
  </Routes>
</main>

     
      <footer className="footer">
        <div className="footer-tasks">
          <h1 className="footer-title">Active tasks: {activeTasksCount}</h1>
          <h1 className="footer-title">Finished tasks: {finishedTasksCount}</h1>
        </div>
        <h1 className="footer-title">Kanban Board by LeonMadsen, 2024</h1>
      </footer>
    </div>
    </Router>
  );
}

export default App;