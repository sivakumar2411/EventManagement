import React, { useContext, useEffect, useState } from 'react'
import '../Assets/Css/Admin.css'
import { Context } from './GlobeData'
import { DeleteUserById, getAllUsers, GetManaRequests, HandleAdmin, UpdateUser, UpdateUserForMana } from '../Assets/Api/UserApi';
import Boy from '../Assets/Datas/AboutData';
import { Delete } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { DeleteManagerById, GetAllManagers} from '../Assets/Api/ManagerApi';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ViewManaDetails from './ViewManaDetails';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

const Admin = () => {

    const {Theme,User} = useContext(Context);

    const [RenderDet,setRD] = useState("Users");
    const [ALLUsers,setAUser] = useState([]);
    const [SearData,setSD] = useState([]);
    const [ManaReqs,setMR] = useState([]);
    const [Managers,setManas] = useState([]);
    const [search,setSearch] = useState("");
    const [changes,setChanges] = useState(true);
    const [VVisi,setVVisi] = useState("hidden");
    const [view,setView] = useState([]);

    const HandleAdminIcon = async(id) =>{
        if(id !== 143)
        {
            await HandleAdmin(id);
            setChanges((prev)=>!prev);
        }
    }
    
    const HandleDeleteIcon = async(id) =>{
            await DeleteUserById(id);
            setChanges((prev)=>!prev);

    }


    useEffect(()=>{

        const FetchU = async() =>{
            const res = await getAllUsers();
            await setAUser(res.data || []);
            await setSD(res.data || []);
            
        }

        const FetchMR = async() =>{
            const res = await GetManaRequests();
            await setMR(res.data || []);
            await setSD(res.data || []);

        }

        const FetchM = async() =>{
            const res = await GetAllManagers();
            await setManas(res.data || []);
            await setSD(res.data || []);
        }
        

        if(RenderDet === "Users")
        FetchU();

        if(RenderDet === "ManaReqs")
        FetchMR();

        if(RenderDet === "Managers")
        FetchM();
    },[changes,RenderDet])

    useEffect(() => {
        let filtered = [];
        if(RenderDet === "Users")
        {
            filtered = ALLUsers.filter((user) =>
                (user.uname.toLowerCase().includes(search.toLowerCase()) ||
            user.id.toString() === search.toLowerCase()));
        }
        else if(RenderDet === "ManaReqs")
        {
            filtered = ManaReqs.filter((mana) =>
            (mana.manager.firstName.toLowerCase().includes(search.toLowerCase()) ||
            mana.id.toString() === search.toLowerCase()));
        }
        else if(RenderDet === "Managers")
        {
            filtered = Managers.filter((user) =>
            (user.manager.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.id.toString() === search.toLowerCase()));
        }
        setSD(filtered);

    }, [search,RenderDet,Managers,ManaReqs,ALLUsers]);


  return (
    <div className={'AdminBaseDiv CenterFication '+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>
                        <ViewManaDetails Mana = {{manager:view[0]?.manager,VVisi,setVVisi}}/>
        <div className={"AdminMainDiv CenterFication "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
                <div className="SideBarOnAdmin">
                    <div className={'SideBarButtonOnAdmin '+((RenderDet === "Users")?"Active ":"")+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")} onClick={()=>setRD("Users")}>Users</div>
                    <div className={'SideBarButtonOnAdmin '+((RenderDet === "Managers")?"Active ":"")+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")} onClick={()=>setRD("Managers")}>Managers</div>
                    <div className={'SideBarButtonOnAdmin '+((RenderDet === "ManaReqs")?"Active ":"")+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")} onClick={()=>setRD("ManaReqs")}>Manager Requests</div>
                </div>
           <div className='SearchHeadingOnAdmin'>
             <input type='text' placeholder='Search' className={'SearchBaronAdmin '+((Theme)?"Dark":"Light")} value={search} onChange={(event)=>(setSearch(event.target.value))}/>
            </div>
            <div className="DatasOnAdmin">
            {(RenderDet === "Users")?<>
                {(SearData.length !== 0)?<>
                {SearData?.map((user,index)=>(
                    <div key={index} className='UDonAdmin'>
                        <div className='LeftDetailDiv CenterFication'>
                            <div className='ProfileImageOnA'>

                            <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={user.profImg?user.profImg:Boy} alt=''/>
                            </div>
                            <div className="ProfileNameOnA" style={{color:(user.admin)?"gold":""}}>{user.uname}</div>
                        </div>
                        <div className='MidDetailDiv'>
                            <p>Participated Evets: {user.ParticipatedEvents?user.ParticipatedEvents.length:0}</p>
                            <p>Organised Events: {user.Events?user.Events.length:0}</p>
                        </div>
                        <div className='RightDetailDiv'>
                           {((user.admin && User.id === 143) || !user.admin)?<><div className='AdminIconOnAdmin' style={{color:(user.id === "143")?"gold":"white",backgroundColor:(user.admin)?(user.id===143?"black":"green"):"red"}} onClick={(event)=>{event.preventDefault();HandleAdminIcon(user.id)}}>A</div>
                            <div className='DeleteIconOnAdmin' style={{visibility:user.id === 143?"hidden":"visible" }} onClick={(event)=>{event.preventDefault();HandleDeleteIcon(user.id);}}><Delete sx={{color:red.A400}}/></div></>:null}
                        </div>
                    </div>
                ))}
                </>:<div className='NotFoundAdmin'>Users Not Found</div>}
            </>:null}
            {(RenderDet === "Managers")?<>
                {(SearData.length !== 0 && SearData.manager !== null)?<>
                {SearData.map((user,index)=>(
                    <div key={index} className='MDonAdmin'>
                        <div className="RightOnMDA CenterFication">
                            <div className="ProfileOfManaDiv">
                                <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={user.manager?.profImg?user.manager.profImg:Boy} alt={user.manager?.firstName}/>
                            </div>
                            <div className="ProfileNameOnMana">
                                {user.manager?.firstName} {user.manager?.lastName}
                            </div>
                        </div>
                        <div className="MiddleDtsDivONMD CenterFication">
                        <p>Managed Evets: {user.manager?.events?user.manager.events.length:0}</p>

                        </div>
                        <div className="RightDtsMD CenterFication">
                           {((user.admin && User.id === 143) || !user.admin)?<>
                            <div className='DeleteIconOnAdmin' style={{visibility:user.id === 143?"hidden":"visible" }} onClick={async(event)=>{event.preventDefault();await DeleteManagerById(user.manager.id);await UpdateUser({...user,mana:false,manager:null});setChanges(!changes)}}><Delete sx={{color:red.A400}}/></div></>:null}
                        </div>
                    </div>
                ))}
                </>:<div className='NotFoundAdmin'>Managers Not Found</div>}
                </>
            :<></>}
            {(RenderDet === "ManaReqs")?<>
                {(SearData.length !== 0)?<>

                {SearData.map((user,index)=>(
                    <div key={index} className='MRDonAdmin'>
                        <div className="profileOnManaReqs">
                        <img style={{width:"100%",height:"100%"}} src={user.profImg?user.profImg:Boy} alt=''/>
                        </div>
                        <div className="detailOnManaReqs">
                            <div className="DetailsOnMana">
                                <div>{user.uname}</div>
                                <div className='ManaViewDts' onClick={()=>{view[0]=user;setVVisi("visible")}}>View Details</div>
                            </div>
                            <div className="AcceptOrNotMana">
                                <div className="AcceptMana" onClick={async(event)=>{event.preventDefault();await UpdateUserForMana({...user,mana:true,manager:{...user.manager,accept:true}});setChanges(!changes)}}><DoneIcon  sx={{color:green.A400}}/></div>
                                <div className="RejectMana" onClick={async(event)=>{event.preventDefault();await UpdateUserForMana({...user,manager:null});await DeleteManagerById(user.manager.id);setChanges(!changes)}}><CloseIcon sx={{color:red.A400}}/></div>
                            </div>
                        </div>
                    </div>
                ))}
                </>:<div className='NotFoundAdmin'>Manager Requests Not Found</div>}
            </>
            :<></>}
            </div>
        </div>
    </div>
  )
}

export default Admin