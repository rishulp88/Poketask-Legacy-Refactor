import React, { useEffect } from 'react';
import apiService from '../apiService';
import Task from './task';

interface ListProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  points: any; // Replace 'any' with the actual type of 'points'
  setPoints: (points: any) => void; // Replace 'any' with the actual type of 'points'
  checked: any; // Replace 'any' with the actual type of 'checked'
  setChecked: (checked: any) => void; // Replace 'any' with the actual type of 'checked'
}

const List: React.FC<ListProps> = ({ tasks, setTasks, points, setPoints, checked, setChecked }) => {
  useEffect(() => {
    const sec = async () => {
      const tasks = await apiService.profile();
      setTasks(tasks);
    };
    sec();
  }, [setTasks]);

  const newTasks = Object.values(tasks);

  return (
    <div className="list_scroll container">
      <h2 className='h2'>Tasks</h2>
      <div className='list'>
        {newTasks.length > 0 ?
          newTasks.map((task: Task) => (
            <Task setTasks={setTasks} task={task} tasks={tasks} points={points} setPoints={setPoints} checked={checked} setChecked={setChecked} />
          )) : <p>No tasks yet</p>
        }
      </div>
    </div>
  );
};

export default List;