import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskDetail({ backlogTasks, readyTasks, inProgressTasks, finishedTasks }) {
  const { taskId } = useParams();
  const navigate = useNavigate();

  
  const allTasks = [...backlogTasks, ...readyTasks, ...inProgressTasks, ...finishedTasks];
  const task = allTasks.find(task => task.id === parseInt(taskId));

  
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');

  
  useEffect(() => {
    if (task) {
      setDescription(task.description || '');
    }
  }, [task]);

  if (!task) {
    return <p>Task not found</p>;
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    task.description = description; 
    setIsEditing(false);
  };

  return (
    <div className="detailPage">
      <h1 className="detailPage-h1">{task.title}</h1>
      {isEditing ? (
        <div class="description">
          <textarea
            value={description}
            onChange={handleDescriptionChange} />
          <button class="submit" onClick={handleSave}>Сохранить</button>
        </div>
      ) : (
        <p className="detailPage-p" onClick={() => setIsEditing(true)}>
          {description || 'This task has no description'}
        </p>
      )}
      <button className="x" onClick={() => navigate('/')}>Х</button>
    </div>
  );
}

export default TaskDetail;