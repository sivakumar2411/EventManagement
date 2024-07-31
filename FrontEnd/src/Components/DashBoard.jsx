import React, { useContext } from 'react'
import { Context } from './GlobeData'
import '../Assets/Css/DashBoard.css'
import Navbar from './Navbar';
import Footer from './Footer';

const DashBoard = () => {
  const{Theme,User} = useContext(Context);

  return (
    <div className={'DashBaseDiv '+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>

        <div className="NavDivOnDash">
            <Navbar/>
        </div>

        <div className="DashMainDiv CenterFication">

        </div>

        <div className="FooterDivOnDash">
            <Footer/>
        </div>

    </div>
  )
}

export default DashBoard