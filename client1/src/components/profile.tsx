import React, { useState } from 'react';
import List from './list';
import { Link } from 'react-router-dom';
import Points from './display-points';
import './task-list.css';

interface Task {
  index: number;
  text: string;
  done: boolean;
}

interface ProfileProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  checked: any; // Replace 'any' with the actual type of 'checked'
  setChecked: (checked: any) => void; // Replace 'any' with the actual type of 'checked'
}

const Profile: React.FC<ProfileProps> = ({tasks, setTasks, checked, setChecked}) => {
  const [ points, setPoints ] = useState<any[]>([]); // Replace 'any' with the actual type of a point in 'points'

  return (
    <section className='profile'>
      <div className='profile1'>
        <Link to="/logout" className='logout pixel' >Logout</Link>
        <List tasks={tasks} setTasks={setTasks} points={points} setPoints={setPoints} checked={checked} setChecked={setChecked}  />
        <Link to="/addTask" className='add-task pixel' >Add task</Link>
      </div>
      <div className='profile2'>
        <Points tasks={tasks} setTasks={setTasks} points={points} setPoints={setPoints}/>
      </div>
    </section>
  );
}

export default Profile;