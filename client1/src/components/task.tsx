import React, { useState, useEffect, MouseEvent } from 'react';
import apiService from '../apiService';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/icons8-trash-24.png';


interface Task {
  index: number;
  text: string;
  done: boolean;
}


interface TaskProps {
  // Existing props
  task: Task;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  points: any; // Replace 'any' with the actual type of 'points'
  setPoints: (points: any) => void; // Replace 'any' with the actual type of 'points'
  
  // Add these lines
  checked: any; // Replace 'any' with the actual type of 'checked'
  setChecked: (checked: any) => void; // Replace 'any' with the actual type of 'checked'
}

const Task: React.FC<TaskProps> = ({ task, setTasks, tasks, points, setPoints }) => {
  let navigate = useNavigate();

  const [state, setState] = useState(task);
  const [checked, setChecked] = useState(false);

  // useeffect to check db for task status after new render of the page
  useEffect(() => {
    const sec = async () => {
      const status = await apiService.getTaskStatus(task);
      setChecked(status)
    }
    sec();
  }, [task]);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await apiService.remove(state);
    if (res.error) {
      alert(`${res.message}`);
      setState(task);
    } else {
      const userInfo = await apiService.profile();
      setTasks(userInfo);
      navigate('/profile');
    }
  }

  const handleCheck = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const res = await apiService.check(state);
    const response = await res[0].done;
    // callback for setstate only when using prevstate
    setChecked(response);

    const newPoints = await apiService.getUserPoints();

    if (res.error) {
      alert(`${res.message}`);
      setState(task);
    } else {
      setPoints(newPoints);
      navigate('/profile');
    }
  }

  return (
    <div className='task-item'>
      <label className='task'>{task.text}
        <input checked={checked} type="checkbox" onClick={handleCheck}/>
        <span className="checkmark" onClick={handleCheck}></span>
      </label>
      <button className='btn' onClick={handleClick}><img src={icon} alt="" /></button>
    </div>
  )
}

export default Task;