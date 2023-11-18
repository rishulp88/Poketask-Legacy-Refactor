import React, { useEffect } from 'react';
import apiService from '../apiService';
import Task from './task';

interface TaskType {
  id: string;
  text: string;
  done: boolean;
  index?: number; // If 'index' is optional in your data structure
}

interface ListProps {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const List: React.FC<ListProps> = ({ tasks, setTasks, points, setPoints, checked, setChecked }) => {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiService.profile();
        if (response && !response.error && Array.isArray(response.data)) {
          // Using type assertion to tell TypeScript that response.data is TaskType[]
          setTasks(response.data as TaskType[]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [setTasks]);

  return (
    <div className="list_scroll container">
      <h2 className='h2'>Tasks</h2>
      <div className='list'>
        {tasks.length > 0 ? tasks.map(task => (
          <Task key={task.id} task={task} setTasks={setTasks} points={points} setPoints={setPoints} checked={checked} setChecked={setChecked} />
        )) : <p>No tasks yet</p>}
      </div>
    </div>
  );
};

export default List;
