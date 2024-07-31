import React, { useContext, useEffect, useState } from 'react'
import '../Assets/Css/Admin.css'
import { Context } from './GlobeData'
import { DeleteUserById, getAllManagerReqs, getAllUsers, HandleAdmin } from '../Assets/JSON/Api';
import Boy from '../Assets/Datas/AboutData';
import { Delete } from '@mui/icons-material';
import { red } from '@mui/material/colors';

const Admin = () => {

    const {Theme,User} = useContext(Context);

    const [RenderDet,setRD] = useState("Users");
    const [ALLUsers,setAUser] = useState([]);
    const [SearData,setSD] = useState([]);
    const [ManaReqs,setMR] = useState([]);
    const [search,setSearch] = useState("");

    const HandleAdminIcon = (id) =>{
        if(id !== "143")
        {
            HandleAdmin(id);
            setAUser(ALLUsers.map((user)=>{
                return user.id === id?{...user,isAdmin:!user.isAdmin}:user;
            }))
            window.location.reload();
        }
    }
    
    const HandleDeleteIcon = (id) =>{
        
            setAUser(ALLUsers.filter((user)=>{
                return user.id !== id;
            }))
            DeleteUserById(id);
            window.location.reload();
    }


    useEffect(()=>{

        const FetchU = async() =>{
            const res = await getAllUsers();
            setAUser(res.data);
            setSD(res.data);
            console.log(res.data);
        }

        const FetchMR = async() =>{
            const res = await getAllManagerReqs();
            setMR(res.data);
        }

        FetchU();
        FetchMR();
    },[])

    useEffect(() => {
        const filtered = ALLUsers.filter((user) =>
            (user.uname.toLowerCase().includes(search.toLowerCase()) ||
            user.id.toString() === search.toLowerCase())
        );
        setSD(filtered);
    }, [search]);


  return (
    <div className={'AdminBaseDiv CenterFication '+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>
        {(User.isAdmin)?
        <div className={"AdminMainDiv CenterFication "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
           <div className='SearchHeadingOnAdmin'>
             <input type='text' placeholder='Search' className={'SearchBaronAdmin '+((Theme)?"Dark":"Light")} value={search} onChange={(event)=>(setSearch(event.target.value))}/>
            </div>
            {(RenderDet !== "ManagerReq")?
            <div className="UserDatasOnAdmin">
                {(SearData.length !== 0)?<>
                {SearData.map((user,index)=>(
                    <div key={index} className='UDonAdmin'>
                        <div className='LeftDetailDiv CenterFication'>
                            <div className='ProfileImageOnA'>

                            <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={user.profImg?user.profImg:Boy} alt=''/>
                            </div>
                            <div className="ProfileNameOnA" style={{color:(user.isAdmin)?"gold":""}}>{user.uname}</div>
                        </div>
                        <div className='MidDetailDiv'>
                            <p>Participated Evets: {user.ParticipatedEvents?user.ParticipatedEvents.length:0}</p>
                            <p>Organised Events: {user.Events?user.Events.length:0}</p>
                        </div>
                        <div className='RightDetailDiv'>
                            <div className='AdminIconOnAdmin' style={{color:(user.id === "143")?"gold":"white",backgroundColor:(user.isAdmin)?(user.id==="143"?"black":"green"):"red"}} onClick={(event)=>{event.preventDefault();HandleAdminIcon(user.id)}}>A</div>
                            <div className='DeleteIconOnAdmin' style={{visibility:user.id === "143"?"hidden":"visible" }} onClick={(event)=>{event.preventDefault();HandleDeleteIcon(user.id);}}><Delete sx={{color:red.A400}}/></div>
                        </div>
                    </div>
                ))}
                </>:<div></div>}
            </div>:
            <div className='ManagerReqDiv'>
                {ManaReqs.map((user,index)=>(
                    <div key={index} className='Manager'>

                    </div>
                ))}
            </div>
            }
        </div>
        :<div></div>}
    </div>
  )
}

export default Admin