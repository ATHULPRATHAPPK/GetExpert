
import api from "../../../infrastructure/api/admin/adminApi"

export const loginAdmin = async (email:string, password:string)=>{
    try{
        console.log("user login function caling...");
        const response = await api.post("/login",{email,password})

        return response.data
    }catch(error){
          console.log("login failed...");       
          console.log(error);
    }
}