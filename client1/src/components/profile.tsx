import React, { useState } from 'react';
import List from './list';
import { Link } from 'react-router-dom';
import Points from './display-points';
import './task-list.css';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface PointsType {
  newPoints: number;
  totalPoints: number;
}

interface ProfileProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ tasks, setTasks, checked, setChecked }) => {
  const [points, setPoints] = useState<PointsType>({ newPoints: 0, totalPoints: 0 });

  // Function to update only the totalPoints
  const updateTotalPoints = (newTotalPoints: number) => {
    setPoints(prev => ({ ...prev, totalPoints: newTotalPoints }));
  };

  return (
    <section className='profile'>
      <div className='profile1'>
        <Link to="/logout" className='logout pixel'>Logout</Link>
        <List tasks={tasks} setTasks={setTasks} points={points.totalPoints} setPoints={updateTotalPoints} checked={checked} setChecked={setChecked} />
        <Link to="/addTask" className='add-task pixel'>Add task</Link>
      </div>
      <div className='profile2'>
        <Points points={points.newPoints} setPoints={setPoints} /> {/* Assuming Points component expects newPoints */}
      </div>
    </section>
  );
}

export default Profile;
