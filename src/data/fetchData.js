import axios from 'axios';

export const getUserData = () => {
   return axios.get(`https://jsonplaceholder.typicode.com/todos`);
    
}