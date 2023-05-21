import { useNavigate } from 'react-router-dom';
export function Test() {
  //write a function that returns a json but in 2 second like its fetching data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'test',
        age: 20,
      });
    }, 2000);
  });
}

export function Authenticate() {
  const token = localStorage.getItem('token');
  const navigete = useNavigate();
  console.log(token);
  if (localStorage.getItem('token')) {
    return { token: localStorage.getItem('token') };
  } else {
    navigete('/login');
    return { token: null };
  }
}

export function logged() {
  console.log('i am beign fired');

  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}
