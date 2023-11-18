import React, { useState, ChangeEvent, FormEvent } from 'react';
import apiService from '../apiService'; // Ensure this is the correct path
import { useNavigate } from 'react-router-dom';

interface Task {
  index: number; // Assuming this is required based on the error
  text: string;
  done: boolean;
}

interface TaskResponse {
  error?: boolean;
  message?: string;
  data?: any; // Adjust based on actual API response
}

interface AddTaskProps {
  tasks: Record<string, Task>;
  setTasks: React.Dispatch<React.SetStateAction<Record<string, Task>>>;
}

const AddTask: React.FC<AddTaskProps> = ({ tasks, setTasks }) => {
  let navigate = useNavigate();

  interface State {
    task?: string;
  }

  const [state, setState] = useState<State>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Add logic to generate or retrieve an index for the new task
    const newIndex = Object.keys(tasks).length; // Example logic
    const newTask: Task = { index: newIndex, text: state.task || '', done: false };
    const res: TaskResponse = await apiService.addTask(newTask);

    if (res.error) {
      alert(`${res.message}`);
      setState({});
    } else {
      try {
        const userInfo = await apiService.profile();
        if (userInfo.error) {
          console.error(userInfo.message);
        } else {
          if (userInfo.data && isRecordOfTasks(userInfo.data)) {
            setTasks(userInfo.data);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
      navigate('/profile');
    }
  };

  const validateForm = () => {
    return !state.task;
  };

  return (
    <section className='container main'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323"></link>
      <h2 className='h2'>New task</h2>
      <form action="submit" onSubmit={handleSubmit}>
        <label>New task:
          <input type="text"
            placeholder="Write a new task"
            name="task"
            value={state.task || ''}
            onChange={handleChange} />
        </label>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;confirm&nbsp;
        </button>
      </form>
    </section>
      );
};

function isRecordOfTasks(obj: any): obj is Record<string, Task> {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export default AddTask;
