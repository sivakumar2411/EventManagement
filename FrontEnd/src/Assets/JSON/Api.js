import axios from "axios";
// import toast from "react-hot-toast";

const API_URL = "http://localhost:3001";

export const getUserById = async(id) => await axios.get(`${API_URL}/Users/${id}`);

export const DeleteUserById = async(id) => await axios.delete(`${API_URL}/Users/${id}`);
    
    export const getAllUsers = async() => {
        try{
            return await axios.get(`${API_URL}/Users`);}
            catch(err)
            {console.log("Error Get All Users",err)}
        }
        
        export const PostUser = async(user) => {
            try{
                const {data:Users} = await getAllUsers();
                const newId = Math.max(...Users?.map(user=>user.id),0);
                
                const Nuser = {
                    ...user,
                    id: (newId + 1).toString(),
                }
        
        axios.post(`${API_URL}/Users`,Nuser);
        return Nuser;
    }
    catch(err)
    {console.log("Error Post User",err)}
}

export const UpdateUser = async(user) =>await axios.put(`${API_URL}/Users/${user.id}`,user);
        
export const getAllEvents = async() =>await axios.get(`${API_URL}/Events`);

export const getAllManagerReqs = async() =>await axios.get(`${API_URL}/ManagerReqs`);

export const HandleAdmin = async(id) =>{
    const{data:user} = await getUserById(id);
    await axios.put(`${API_URL}/Users/${user.id}`,{...user,isAdmin:!user.isAdmin});
}

export const PostForManagerReqs = async(data) =>{

    const {data:Reqs} = await getAllManagerReqs();
    console.log(data);

    // const newId = Math.max(...Reqs?.map(req=>req.id),0);
    
    await axios.post(`${API_URL}/ManagerReqs`,data);

}