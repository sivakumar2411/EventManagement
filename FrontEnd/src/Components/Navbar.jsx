import React, { useContext, useEffect, useState } from 'react'
import { Context } from './GlobeData'
import '../Assets/Css/NavBar.css'
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
// import NightsStayIcon from '@mui/icons-material/NightsStay';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { DarkMode } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import Boy from '../Assets/Datas/AboutData';

const Navbar = () => {
    const {LoggedIn,User,Theme,setTheme,LOGOUT} = useContext(Context);
    const [sidebar,setSidebar] = useState(false);
    const [curPage,setPage] = useState("Home");
    const navi = useNavigate();

    const [isProf,setIP] = useState(false);

    useEffect(()=>{

      const Home = document.getElementsByClassName("HomeBaseDiv");
      if(Home.length > 0)
        setPage("Home");
      const Event = document.getElementsByClassName("EventBaseDiv");
      if(Event.length > 0)
        setPage("Event");
      const Dash = document.getElementsByClassName("DashBaseDiv");
      if(Dash.length > 0)
        setPage("Dash");
      const About = document.getElementsByClassName("AboutBaseDiv");
      if(About.length >0)
        setPage("About");

    },[])

     const ScrolToTop = ()=>{
      window.scrollTo({top: 0, behavior:'smooth'});
    }

  return (
    <div className={'NavBarDiv '+((Theme)?"Dark":"Light")}>

      {(isProf)?<div className={'ProfileDivOnNavBar CenterFication '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")} >
        <div className="TopOnProfile CenterFication" onClick={(event)=>{navi('/Profile');}}>
          <div className="ProfilePicDivOnNav CenterFication">
            <img src={User?.profImg?User.profImg:Boy} alt={User.uname}/>
          </div>
          <div className="ProfileNameDivOnNav CenterFication">{User.uname}</div>
        </div>
        <div className="CloseIconOnProfNav" onClick={(event)=>setIP(false)}><CloseIcon/></div>
        <div className="BottomOnProfile CenterFication">
          <div className="ProfileDetailsNav item-1" onClick={(event)=>{navi('/Profile');}}>
            <div className="ProfileDetailsIconOnDiv CenterFication" ><PersonIcon/></div>
            <div className="ProfileDetailOnDiv ">Profile</div>
          </div>
          <div className="ProfileDetailsNav item-2" onClick={(event)=>{LOGOUT();setIP(false);navi('/');ScrolToTop()}}>
            <div className="ProfileDetailsIconOnDiv CenterFication"><LogoutIcon/></div>
            <div className="ProfileDetailOnDiv ">LogOut</div>
          </div>
        </div>
      </div>:null}

      {(sidebar)?<div className={'NavBarSideBarDiv '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
        <div className={'SideBarIcon SCloseIcon '+((Theme)?"Dark":"Light")} onClick={(event)=>setSidebar((prev)=>!prev)}><CloseIcon/></div>
        {/* <div className="SidebarItems item-1 CenterFication" onClick={(event)=>setTheme((prev)=>!prev)} >
        <div className={'ThemeIcon '+((Theme)?"Dark":"Light")} >{(Theme)?<LightModeIcon/>:<DarkMode/>}</div>
        <div className='SidebarItemsName '>ChangeTheme</div>
        </div> */}
        <div></div>
        <div></div>
        <div className="SidebarItems item-1 CenterFication" onClick={(event)=>{navi('/Home');ScrolToTop()}}>
        <div className={'ThemeIcon '+((Theme)?"Dark":"Light")} ><HomeIcon/></div>
        <div className='SidebarItemsName '>Home</div>
        </div>
        {(LoggedIn && (User.mana || User.eventsOrganised?.length > 0))?<div className="SidebarItems item-2 CenterFication" onClick={(event)=>{navi('/DashBoard');ScrolToTop()}}>
        <div className={'ThemeIcon '+((Theme)?"Dark":"Light")} ></div>
        <div className='SidebarItemsName '>DashBoard</div>
        </div>:null}
        <div className="SidebarItems item-3 CenterFication" onClick={(event)=>{navi('/Events');ScrolToTop()}}>
        <div className={'ThemeIcon '+((Theme)?"Dark":"Light")} ><EventIcon/></div>
        <div className='SidebarItemsName '>Events</div>
        </div>
        <div className="SidebarItems item-4 CenterFication" onClick={(event)=>{navi('/About');ScrolToTop()}}>
        <div className={'ThemeIcon '+((Theme)?"Dark":"Light")} ><GroupsIcon/></div>
        <div className='SidebarItemsName '>About Us</div>
        </div>
        {(LoggedIn)?<div className="SidebarItems item-5 CenterFication" onClick={(event)=>{navi('/Profile');}}>
        <div className={'ThemeIcon '} style={{borderRadius:"50%"}} >
          <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={User?.profImg?User.profImg:Boy} alt={User?.uname}/>
        </div>
        <div className='SidebarItemsName '>Profile</div>
        </div>:null}
        <div className="SidebarItems item-6 CenterFication" onClick={(event)=>{if(LoggedIn){LOGOUT();navi('/');ScrolToTop()}else{navi('/Sign')}}}>
        <div className={'ThemeIcon '+((Theme)?"Dark":"Light")} >{(LoggedIn)?<LogoutIcon/>:<PersonIcon/>}</div>
        <div className='SidebarItemsName '>{(LoggedIn)?"LogOut":"SignIn"}</div>
        </div>
      </div>:<></>}

        <div className='NavBarInnerDiv CenterFication'>
            
            <div className="EventCraftHeading">EventCraft</div>

            <div className={"navhead nav-1 "+((Theme)?"Dark":"Light")+((curPage === "Home")?" CurPage":"")} onClick={(event)=>{navi("/Home");ScrolToTop()}}>Home</div>

            {(LoggedIn && (User.mana || User.eventsOrganised?.length > 0))?<div className={"navhead nav-2 "+((Theme)?"Dark":"Light")+((curPage === "Dash")?" CurPage":"")} onClick={(event)=>{navi("/DashBoard");ScrolToTop()}}>DashBoard</div>:null}

            <div className={"navhead nav-3 "+((Theme)?"Dark":"Light")+((curPage === "Event")?" CurPage":"")} onClick={(event)=>{navi("/Events");ScrolToTop()}}>Events</div>
            <div className={"navhead nav-4 "+((Theme)?"Dark":"Light")+((curPage === "About")?" CurPage":"")} onClick={(event)=>{navi("/About");ScrolToTop()}}>About Us</div>
            

            {(!LoggedIn)?<div className="navhead nav-5 SignInButton " onClick={(event)=>navi("/Sign")}>SignIn</div>:
            <div className={'ThemeIcon ProfileImageonNavbar '} onClick={(event)=>setIP(true)} >
                <img src={User?.profImg?User.profImg:Boy} alt={User?.uname} />
              </div>}

            {(sidebar)?<></>:<div className={'SideBarIcon SMenuIcon '+((Theme)?"Dark":"Light")} onClick={(event)=>setSidebar((prev)=>!prev)}><MenuIcon/></div>}
            <div className={'ThemeIcon '+((Theme)?"Dark":"Light")} onClick={(event)=>{setTheme((prev)=>!prev)}} >{(Theme)?<LightModeIcon/>:<DarkMode/>}</div>
        </div>
    </div>
  )
}

export default Navbar