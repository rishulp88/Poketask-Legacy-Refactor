import React, { useState, ChangeEvent, FormEvent } from 'react';
import auth from '../auth';
import apiService from '../apiService';
import { useNavigate } from 'react-router-dom';

interface LoginState {
  email: string;
  password: string;
}

// If there are specific props, define them here
interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const initialState: LoginState = {
  email: '',
  password: '',
};

const Login: React.FC<LoginProps> = (props) => {
  let navigate = useNavigate();
  const [state, setState] = useState<LoginState>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = state;
    const user = { email, password };
    const res = await apiService.login(user); // Ensure res has the correct type
    if (res.error){
      alert(`${res.message}`);
      setState(initialState);
    } else {
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/profile'));
    }
  };

  const validateForm = (): boolean => {
    return !state.email || !state.password;
  };

  return (
    <section className='main'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323"></link>

      <h2 className='h2'>Login</h2>
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
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </section>
  );
}

export default Login;
