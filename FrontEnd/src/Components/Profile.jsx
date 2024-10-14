import React, { useContext, useState } from 'react'
import { Context } from './GlobeData'
import '../Assets/Css/Profile.css'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { getAllUsers, UpdateUser } from '../Assets/Api/UserApi';
import Boy from '../Assets/Datas/AboutData';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import { green, pink } from '@mui/material/colors';
import toast from 'react-hot-toast';
import { Add } from '@mui/icons-material';



const Profile = () => {

    const {Theme,User,Update} = useContext(Context);
    const [UserDatas,setUD] = useState(User);
    const navi = useNavigate();

    const [isDetail,setIsDet] = useState(true);

    const [isEditable,setIsEdit] = useState(false);
    const [ConfirmDiv,setCD] = useState(false);
    const [DiscardDiv,setDD] = useState(false);

    const ProfileImage = (event) =>{
        const file=event.target.files[0];
    const reader=new FileReader();
    if(file)
        {
        reader.onloadend=()=>{
            setUD({...UserDatas,profImg:reader.result});
        }
        reader.readAsDataURL(file);
        }
    }

    const UpdateprofileDts = async()=>{

        const res = await getAllUsers();
        for(const u of res.data)
        {
            if(u.uname === UserDatas.uname && u.id !== UserDatas.id)
                {
                    console.log(u,UserDatas);
                    
                    toast.error("UserName Already Exist");
                    return;
                }
        }
        UpdateUser(UserDatas);
        Update(UserDatas);
        setIsEdit(false);

    }

  return (
    <div className={'ProfileMainDiv CenterFication '+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>
        <div className='HomeAndAdminDiv'>
            <div className={'HomeIcononProfile '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")} onClick={(event)=>{navi('/Home')}}><HomeIcon sx={{color:pink.A400}}/></div>
            {(UserDatas.admin)?<div className={'AdminIcononProfile '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")} onClick={(event)=>{navi('/Admin')}}><AdminPanelSettingsIcon color='primary'/></div>:null}
            {(UserDatas.manager)?null:<div className={'AdminIcononProfile '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")} onClick={(event)=>{navi('/ManagerApplication')}} title='Apply for Manager'><Add sx={{color:green.A400}}/></div>}
        </div>
        <div className="ProfileContents ">
            <div className={"ProfileSideContent CenterFication "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
                <div className="ProfileImageDiv">
                    <div className="ProfileImagePlacer">
                    {(isEditable)?<>
                    <label htmlFor='ProfImgInput' style={{cursor:"pointer"}}>
                        <input type='file' id='ProfImgInput' style={{overflow:'hidden',width:"0",height:"0"}} accept='image/*' /*onChange={ProfileImage}*//>
                    <img src={UserDatas.profImg?UserDatas.profImg:Boy} alt={User.uname} />
                    <span><AddAPhotoIcon/></span></label></>:
                    <img src={UserDatas.profImg?UserDatas.profImg:Boy} alt={User.uname} />}
                    </div>
                    <div className='ProfileImgName' style={{color:User.admin?"gold":User.mana?"green":""}}>{User.uname}</div>
                </div>
                <div className='ProfileSideBarContentDiv CenterFication'>
                        <div className="ProfileSideOptions Option-1" style={{color:isDetail?"blue":""}} onClick={(event)=>setIsDet(true)}>Personal Info</div>
                        <div className="ProfileSideOptions Option-2" style={{color:isDetail?"":"blue"}} onClick={(event)=>setIsDet(false)}>Events</div>
                </div>
            </div>
            <div className={"ProfileMainContent CenterFication "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
                {(isDetail)?<>
                <div className={"ProfileMainDetailsDiv "+((Theme)?"Dark":"Light")}>
                    <div className="PMDUserNameDiv">
                        <label htmlFor='ProfUN'><span>Name</span><br/>
                        <input id='ProfUN' type='text' minLength={4} required maxLength={23} readOnly={!isEditable} onChange={(event)=>{setUD({...UserDatas,uname:event.target.value})}} value={UserDatas.uname} style={{border:isEditable?"1px groove":"none",outline:isEditable?"":"none",background:"none"}} />
                        </label>
                    </div>
                    <div className="PMDUserGenderDiv">
                        <label htmlFor='ProfGN'><span>Gender</span><br/>
                        <div>
                        {/* <input id='Pro' type='text' minLength={4} required maxLength={23} readOnly={!isEditable} onChange={(event)=>{setUD({...UserDatas,uname:event.target.value})}} value={UserDatas.uname} style={{border:isEditable?"1px groove":"none",outline:isEditable?"":"none",background:"none"}} /> */}
                        <p className='ProfileGender'>{UserDatas.gender}</p>
                        {(isEditable)?<select id='ProfGN' style={{color:"black"}} onClick={(event)=>{event.preventDefault();setUD({...UserDatas,gender:event.target.value})}}>
                            <option selected={UserDatas.gender === "Male"}>Male</option>
                            <option selected={UserDatas.gender === "Female"}>Female</option>
                        </select>:null}
                        </div>
                        </label>

                    </div>
                    <div className="PMDUserRegionDiv">
                        <label htmlFor='ProfRN'><span>Region</span><br/>
                        <div>
                        <p className='ProfileRegion'>{UserDatas.region}</p>
                        {(isEditable)?<select id='ProfRN' style={{color:"black"}} onClick={(event)=>{event.preventDefault();setUD({...UserDatas,region:event.target.value})}}>
                            <option selected={(UserDatas.region)==="Asia"}>Asia</option>
                            <option selected={(UserDatas.region)==="Africa"}>Africa</option>
                            <option selected={(UserDatas.region)==="Australia"}>Australia</option>
                            <option selected={(UserDatas.region)==="Europe"}>Europe</option>
                            <option selected={(UserDatas.region)==="North America"}>North America</option>
                            <option selected={(UserDatas.region)==="South America"}>South America</option>
                        </select>:null}
                        </div>
                        </label>

                    </div>
                    <div className="PMDUserAboutDiv">
                    <label htmlFor='ProfAbout'><span>About</span><br/>
                        <textarea id='ProfAbout' minLength={1} required maxLength={60} readOnly={!isEditable} onChange={(event)=>{setUD({...UserDatas,about:event.target.value})}} value={UserDatas.about} style={{border:isEditable?"1px groove":"none",outline:isEditable?"":"none",background:"none",resize:"none"}} />
                        </label>
                    </div>
                </div>
                <div className="ProfileMainEditSymbols">
                    {(isEditable)?<><div className='EditIcons ProfClearIcon' onClick={(event)=>{setIsEdit(false);setUD(User);}}><Fab color='secondary' className='FabIconOnPro' ><ClearIcon/></Fab></div>
                        <div className='EditIcons ProfSaveIcon' onClick={(event)=>{UpdateprofileDts();}}><Fab color='secondary' className='FabIconOnPro'><BookmarkAddedIcon/></Fab></div>
                    </>:
                        <div className='EditIcons ProfEditIcon' onClick={(event)=>{setIsEdit(true);}}><Fab color='secondary' className='FabIconOnPro'><EditIcon/></Fab></div>}
                </div>
                </>:<></>}
            </div>
        </div>
    </div>
  )
}

export default Profile