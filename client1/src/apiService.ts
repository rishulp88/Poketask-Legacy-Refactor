const BASE_URL = 'http://localhost:3009';

interface ApiService {
  register: (user: any) => Promise<any>;
  login: (user: any) => Promise<any>;
  logout: () => Promise<any>;
  profile: () => Promise<any>;
  addTask: (task: any) => Promise<any>;
  remove: (task: any) => Promise<any>;
  check: (task: any) => Promise<any>;
  getUserPoints: () => Promise<any>;
  getTaskStatus: (task: any) => Promise<any>;
}

const apiService: ApiService = {
  register: (user) => {
    return fetch(`${BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.text())
      .then((text) => JSON.parse(text))
      .catch((err) => {
        console.log('Error during fetch:', err);
        throw err;
      });
  },
  
login: (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  })
  .then((res) => {
    return res.text();
  })
  .then((text) => {
    return JSON.parse(text);
  })
    .catch((err) => console.log(err));
},

logout: () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
},

profile: () => {
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
  })
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      return JSON.parse(text);
    })
      .catch((err) => console.log('api error profile ' ,err));
},

addTask: (task)=> {
  return fetch(`${BASE_URL}/addTask`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  })
  .then((res) => {
    return res.text();
  })
   .catch((err) => console.log(err));
},
remove: (task) => {
  return fetch(`${BASE_URL}/remove`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  })
  .then((res) => {
    return res;
  }
  )
  .catch((err) => console.log(err));
},

check: (task) => {
  return fetch(`${BASE_URL}/check`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  })
  .then((res) => {
    return res.json();
  }
  )
  .catch((err) => console.log(err));
},

getUserPoints: () => {
  return fetch(`${BASE_URL}/points`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
  })
    .then((res) => {
      
      return res.json();
    })
      .catch((err) => console.log('api error profile ' ,err));
},

getTaskStatus: (task) => {
  return fetch(`${BASE_URL}/isChecked`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  })
  .then((res) => {
    return res.json();
  }
  )
  .catch((err) => console.log(err));
}
};


export default apiService;