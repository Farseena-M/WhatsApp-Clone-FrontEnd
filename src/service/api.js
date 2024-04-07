import axios from 'axios'
const url = 'http://localhost:4000'

export const getUsers = async () => {
    try {
        const response = await axios.get(`${url}/users/all`)
        console.log(response);
        return response.data
    } catch (error) {
        console.log('Error while calling getusers API', error.message);
    }
} 