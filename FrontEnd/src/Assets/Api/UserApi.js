import axios from "axios";
// import toast from "react-hot-toast";

const API_URL = "http://localhost:4040";

export const getUserById = async(id) => await axios.get(`${API_URL}/Users/GetById/${id}`);

export const DeleteUserById = async(id) => await axios.delete(`${API_URL}/Users/DeleteById/${id}`);
    
export const getAllUsers = async(a) => {
        try{
            return await axios.get(`${API_URL}/Users/GetAll`,{params:{pageNo:a}});}
            catch(err)
            {console.log("Error Get All Users",err)}
        }
        
export const PostUser = async(user) => {
     try{
        return axios.post(`${API_URL}/Users/InsertNew`,user);
        // return user;
    }
    catch(err)
    {console.log("Error Post User",err)}
}

export const UpdateUser = async(user) =>await axios.put(`${API_URL}/Users/UpdateUser/${user.id}`,user);

export const LogInApi = async(a,b) => await axios.get(`${API_URL}/Users/LogIn/${a}/${b}`);

export const GetManaRequests = async() => await axios.get(`${API_URL}/Users/GetReqs`)
        
// export const getAllEvents = async() =>await axios.get(`${API_URL}/Events/`);


export const HandleAdmin = async(id) =>{
    const{data:user} = await getUserById(id);
    await axios.put(`${API_URL}/Users/UpdateUser/${user.id}`,{...user,admin:!user.admin});
}

// export const getAllManagerReqs = async() =>await axios.get(`${API_URL}/ManagerReqs`);

// export const PostForManagerReqs = async(data) =>{

//     const {data:Reqs} = await getAllManagerReqs();
//     console.log(data);

//     // const newId = Math.max(...Reqs?.map(req=>req.id),0);
    
//     await axios.post(`${API_URL}/ManagerReqs`,data);

// }