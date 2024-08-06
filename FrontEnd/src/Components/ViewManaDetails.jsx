import React, { useContext, useRef } from 'react'
import '../Assets/Css/ViewManaDetails.css'
import { Context } from './GlobeData'

const ViewManaDetails = (props) => {

  const{Theme} = useContext(Context);
  const {Manager,setVVisi,VVisi} = props.Mana;
  const viewRef = useRef(null)

  const HandleClose = (event) =>{
    if(viewRef.current && !viewRef.current.contains(event.target))
      setVVisi('hidden');
  }

  return (
    <div className='ManagerDtsOnAdminViewMain' style={{visibility:VVisi}} onClick={HandleClose}>
        <div ref={viewRef} className={"ManagerDtsView "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>

        </div>
    </div>
  )
}

export default ViewManaDetails