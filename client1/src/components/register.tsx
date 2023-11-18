import React, { useState, ChangeEvent, FormEvent } from 'react';
import auth from '../auth';
import apiService from '../apiService'
import { useNavigate, Link } from 'react-router-dom';
import './register-page.css';

// Define the structure of the form state
interface RegisterState {
  email: string;
  password: string;
  firstName: string;
}

// Define the props for the Register component, if any
interface RegisterProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const initialState: RegisterState = {
  email: '',
  password: '',
  firstName: '',
};

const Register: React.FC<RegisterProps> = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState<RegisterState>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { firstName, email, password } = state;
    const user = { firstName, email, password };
    const res = await apiService.register(user); // Ensure res has the correct type
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/profile'));
    }
  };

  const validateForm = (): boolean => {
    return !state.email || !state.password || !state.firstName;
  };

  return (
    <section className='container main'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323"></link>
      <h2 className='h2'>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className='field'
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input className='field'
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <input className='field'
          type="text"
          placeholder="Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
      <Link to="/login" className='add-task login'>Login</Link>
    </section>
  );
};

export default Register;
