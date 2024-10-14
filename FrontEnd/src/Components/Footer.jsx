import React, { useContext } from 'react'
import { Context } from './GlobeData'
import '../Assets/Css/Footer.css'
import { EventCraft } from '../Assets/Images/Images';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const {Theme} = useContext(Context);

    const navi = useNavigate();

    const ScrolToTop = ()=>{
        window.scrollTo({top: 0, behavior:'smooth'});
      }

  return (
    <div className={'FooterDetailDiv CenterFication '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
        <div className="FooterInnerDetailDiv FooterIcon">
            <div className="FooterIconImage">
                {/* <img src={EventCraft} alt='Logo'/> */}
            </div>
            <div className="FContentS"><span style={{fontFamily:"cursive"}}>S2V</span> Ltd.</div>
            <div className="FContentS">Providing reliable tech since 2022</div>
            <div className="FContentS FootCopyRight">Copyright &copy; 2024 - All right reserved</div>
        </div>
        <div className="FooterInnerDetailDiv FooterService">
            <div className="FContentheading">Service</div>
            <div className="FContentS" onClick={(event)=>{navi('/Events');ScrolToTop()}}>Events</div>
            <div className="FContentS" onClick={(event)=>{}}>Event Booking</div>
        </div>
        <div className="FooterInnerDetailDiv FooterCom">
            <div className="FContentheading">Company</div>
            <div className="FContentS" onClick={(event)=>{navi('/About');ScrolToTop()}}>About</div>
            <div className="FContentS" onClick={(event)=>{}}>Contact Us</div>
        </div>
        <div className="FooterInnerDetailDiv FooterLegal">
            <div className="FContentheading">Legal</div>
            <div className="FContentS" onClick={(event)=>{}}>Terms of use</div>
            <div className="FContentS" onClick={(event)=>{}}>Privacy policy</div>
            <div className="FContentS" onClick={(event)=>{}}>Cookie policy</div>
        </div>
        <div className="FooterInnerDetailDiv FooterSocial">
            <div className="FContentheading">Social</div>
            <div className="FContentS">X</div>
            <div className="FContentS">Instagram</div>
            <div className="FContentS">FaceBook</div>
        </div>
    </div>
  )
}

export default Footer