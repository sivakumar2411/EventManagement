import React, { useContext, useRef } from 'react'
import '../Assets/Css/ViewManaDetails.css'
import { Context } from './GlobeData'
import Boy from '../Assets/Datas/AboutData';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';
import RatingStar from './RatingStar';
import ReviewsCarousel from './ReviewsCarousel';

const ViewManaDetails = (props) => {

  const{Theme} = useContext(Context);
  const {manager,setVVisi,VVisi} = props.Mana;
  const viewRef = useRef(null)

  const HandleClose = (event) =>{
    if(viewRef.current && !viewRef.current.contains(event.target))
      setVVisi('hidden');
  }

  return (
    <div className='ManagerDtsOnAdminViewMain' style={{visibility:VVisi}} onClick={HandleClose}>
        <div ref={viewRef} className={"ManagerDtsView "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
          <div style={{position:'absolute',top:"10px",right:"10px",cursor:"pointer"}} onClick={()=>setVVisi('hidden')}><CloseIcon sx={{color:red.A400}}/></div>
          <div className="ManagerContents MC-1">
            <div className="ManaProfilImageOnMVD">
              <img src={manager?.profImg?manager.profImg:Boy} alt={manager?.firstName} />
            </div>
            <div className="ManaProfilDTSMVD"><div className='MHeadMVD'>Name</div> <div className='MDtsMVD'>{manager?.firstName} {manager?.lastName}</div></div>
            <div className='ManaProfilDTSMVD'><div className='MHeadMVD'>Age</div> <div className='MDtsMVD'>{new Date().getFullYear()-new Date(manager?.birthDate).getFullYear()}</div></div>
            <div className='ManaProfilDTSMVD'><div className='MHeadMVD'>City</div> <div className='MDtsMVD'>{manager?.city}</div></div>
            <div className='ManaProfilDTSMVD'><div className='MHeadMVD'>Email</div> <div className='MDtsMVD'>{manager?.email}</div></div>
            <div className='ManaProfilDTSMVD'><div className='MHeadMVD'>Mobile No</div> <div className='MDtsMVD'>{manager?.mobNo}</div></div>
            <div className='ManaProfilDTSMVD'><div className='MHeadMVD'>Experience</div> <div className='MDtsMVD'>{manager?.exp}</div></div>
          </div>
          <div className="ManagerContents MC-2">
            {(manager?.accept)?<>
            <div className='ManaProfilDTSMVD'><div className='MHeadMVD'>Managed Events</div> <div className='MDtsMVD'>{manager?.events?manager.events.length:0}</div></div>
            <div className='ManaProfilDTSMVD'><div className='MHeadMVD'>Rating</div> <div className='MDtsMVD'><RatingStar reviews={manager?.review}/></div></div>
            <div className='ManaProfilDTSMVD'><div className='MHeadMVD'>Reviews</div></div>
            <div className='ManaProfilDTSMVD RevOnMPDTSMVD'>
              <ReviewsCarousel reviews = {manager?.review} />
            </div>
            </>:<>{manager?.resume}</>}</div>
        </div>
    </div>
  )
}

export default ViewManaDetails