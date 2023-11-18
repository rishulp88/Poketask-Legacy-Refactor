import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import apiService from '../apiService';
import Register from './register';
import Login from './login';
import Logout from './logout';
import Profile from './profile';
import AddTask from './add-task';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface DashboardProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checked, setChecked] = useState<boolean>(false); // Define checked state

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userInfo = await apiService.profile(); // Adjust based on actual API response
        if (userInfo && Array.isArray(userInfo)) {
          setTasks(userInfo);
        } else {
          console.log('No tasks found');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    getProfile();
  }, []);

  return (
    <div className="dashboard">
      <Routes>
        <Route path="/" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
        {/* Provide the correct props to Profile and AddTask */}
        <Route path="/profile" element={<Profile tasks={tasks} setTasks={setTasks} checked={checked} setChecked={setChecked} />} />
        <Route path="/addTask" element={<AddTask tasks={tasks} setTasks={setTasks} />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
