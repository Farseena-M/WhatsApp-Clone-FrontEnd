/* import axios from 'axios'

const url ='http://localhost:4000'

export const addUser = async(data) =>{
    try{
     await axios.post(`${url}/add`,data)
    }catch(error){
        console.log('Error while addUser API',error.message);
    }
}

export const getUsers = async() =>{
    try{
     const response = await axios.get(`${url}/users`)
     console.log(response);
     return response.data
    }catch(error){
   console.log('Error while calling getusers API',error.message);
    }
} */