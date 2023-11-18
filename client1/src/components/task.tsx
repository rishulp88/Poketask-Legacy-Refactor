import React, { useState, useEffect } from 'react';
import apiService from '../apiService'; // Import your API service here
import { useNavigate } from 'react-router-dom';
import icon from '../assets/icons8-trash-24.png'; // Ensure this path is correct

// Task structure as per your backend
interface TaskType {
  index: number;
  text: string;
  done: boolean;
}

// Props for the Task component
interface TaskProps {
  task: TaskType;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  tasks: TaskType[];
  points: number; // Assuming points is just a number
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const Task: React.FC<TaskProps> = ({ task, setTasks, tasks, points, setPoints }) => {
  let navigate = useNavigate();

  const [checked, setChecked] = useState<boolean>(task.done);

  // Fetch task status on mount
  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const response = await apiService.getTaskStatus(task);
        if (!response.error) {
          setChecked(response.data); // Assuming response.data is a boolean
        }
      } catch (error) {
        console.error('Error fetching task status:', error);
      }
    };
    fetchTaskStatus();
  }, [task]);

  const handleClick = async () => {
    try {
      await apiService.remove(task);
      const updatedTasks = await apiService.profile();
      setTasks(updatedTasks);
      navigate('/profile');
    } catch (error) {
      console.error('Error removing task:', error);
    }
  }

  const handleCheck = async () => {
    try {
      await apiService.check(task);
      const updatedPoints = await apiService.getUserPoints();
      setPoints(updatedPoints);
      setChecked(!checked);
      navigate('/profile');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  return (
    <div className='task-item'>
      <label className='task'>{task.text}
        <input checked={checked} type="checkbox" onChange={handleCheck} />
        <span className="checkmark"></span>
      </label>
      <button className='btn' onClick={handleClick}><img src={icon} alt="" /></button>
    </div>
  );
}

export default Task;
