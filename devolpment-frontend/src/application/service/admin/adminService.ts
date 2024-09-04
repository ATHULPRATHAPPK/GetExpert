import adminApi from "../../../infrastructure/api/admin/adminApi";

export const fetchTechData = async () => {
    try {
        const response = await adminApi.get("/tech-data");
        console.log(response.data.data);
        
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching technician data:", error);
        throw new Error("Failed to fetch technician data");
    }
}

export const   techApprove =async(email:string,commnet:string|null)=>{
    const response = await adminApi.post("/tech-approve",{email,commnet});
    console.log("response",response);
    return response.data.approve
}
