const BASE_URL = 'http://localhost:3009';

// User Interface
interface User {
  email: string;
  password: string;
  firstName?: string;
}

// Task Interface
interface Task {
  index: number;
  text: string;
  done: boolean;
}

// Generic API Response Interface
interface ApiResponse<T> {
  error?: boolean;
  message?: string;
  data?: T;
}

// API Service
const apiService = {
  register(user: User): Promise<ApiResponse<User>> {
    return fetch(`${BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .catch((err) => {console.log('Error during fetch:', err); throw err;});
  },

  login(user: User): Promise<ApiResponse<User>> {
    return fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  },

  logout(): Promise<ApiResponse<null>> {
    return fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  },

  profile(): Promise<ApiResponse<Task[]>> {
    return fetch(`${BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .catch((err) => console.log('api error profile ' ,err));
  },

  addTask(task: Task): Promise<ApiResponse<Task>> {
    return fetch(`${BASE_URL}/addTask`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  },

  remove(task: Task): Promise<ApiResponse<null>> {
    return fetch(`${BASE_URL}/remove`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  },

  check(task: Task): Promise<ApiResponse<Task>> {
    return fetch(`${BASE_URL}/check`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  },

  getUserPoints(): Promise<ApiResponse<number>> {
    return fetch(`${BASE_URL}/points`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .catch((err) => console.log('api error profile ' ,err));
  },

  getTaskStatus(task: Task): Promise<ApiResponse<boolean>> {
    return fetch(`${BASE_URL}/isChecked`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task),
    })  
    .then((res) => res.json())
    .catch((err) => console.log(err));
  }
};

export default apiService;
