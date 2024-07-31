import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from './GlobeData';
import '../Assets/Css/WrongUrl.css'
import { catImg } from '../Assets/Datas/AboutData';

const WrongUrl = () => {

    const {Theme} = useContext(Context);
    const navi = useNavigate();
  return (
    <div  className={'WrongUrlBaseDiv CenterFication '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
        <div className='WrongUrlImage CeneterFication'>
          <img src={catImg.Inj} alt='Error 404'/>
        </div>
        <h1 style={{color:"red"}}>Something Went Wrong...</h1>
        <h3 style={{cursor:"pointer",textDecoration:"underline",color:"blue"}}  onClick={(event)=>navi("/Home")}>Redirect To Home</h3>
    </div>
  )
}

export default WrongUrl