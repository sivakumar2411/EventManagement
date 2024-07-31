import React, { useContext, useState } from 'react'
import { Context } from './GlobeData';
import '../Assets/Css/SignPage.css'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Boy from '../Assets/Datas/AboutData';


const SignPage = () => {

    const {LoggedIn,Theme,User,LOGOUT} = useContext(Context);
    const [LogIn,setLogIn] = useState(true);

  return (
    <div className={'SignPageDiv CenterFication '+((Theme)?"ThemeDarkBG":"ThemeLightBG") }>
        {(LoggedIn)?
        <><div className={"ProfilePageOnSign "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
            <div className="ProfileImageOnSign" >
              <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={User.profImg?User.profImg:Boy} alt={User.uname} />
            </div>

          <div className="UserNameOnSign">{User.uname}</div>
          <button onClick={(event)=>{event.preventDefault();LOGOUT();}}>Logout</button>
          </div></>:
        <>
        <div className={'LogSignHolderDiv CenterFication '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
            {(LogIn)?
            <><div className='SignSideBar SIBG ImageCenterFication'></div><div className='SignMainBar CenterFication'><SignIn Log={{LogIn,setLogIn}}/></div></>:
            <><div className='SignMainBar CenterFication'><SignUp Log={{LogIn,setLogIn}}/></div><div className='SignSideBar SUBG ImageCenterFication'></div></>}
        </div>
        </>
        }
    </div>
  )
}

export default SignPage