import axios from "../../Axios";
import { useNavigate } from "react-router-dom";


const login = async (data) =>{
    
    const response = await axios.post('user/login/',data)

    if(response.data){
        console.log(response.data)
        localStorage.setItem('user',JSON.stringify(response.data))
      
    }

    return response.data
}

const logout = () =>{
   
    localStorage.removeItem('user')
    
}

const LoginService ={
    login,logout
}

export default LoginService