import techApi from "../../../infrastructure/api/tech/techApi";




export const documentSubmition = async (data:any)=>{
    console.log("function called",data);
    
try{

    const response = await techApi.post("/documents", data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    console.log(response);
    return response.data;
}catch(error){
 console.log(error);
 
}
}


export const fetchDashData = async (data:any)=>{
  console.log("calling when refresh.....",data);
  try{
    if (typeof data !== 'object' || data === null) {
      console.error("Invalid data format. Expected an object.");
      return;
    }
  
    const result = await techApi.get("/dash-board", {
      params: data,
    });
    return result
  }catch(error){
    console.log(error);
    
  }
}