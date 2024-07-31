import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../Assets/Css/Home.css'
import '../App.css'
import { Context } from './GlobeData';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useInView } from 'react-intersection-observer';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const {Theme,LoggedIn,User} = useContext(Context);

    const navi = useNavigate();

    const [n1,setN1] = useState(0);
    const [n2,setN2] = useState(0);
    const [n3,setN3] = useState(0);
    const [n4,setN4] = useState(0);

    const {ref:ref1,inView:inView1} = useInView({
      triggerOnce: true,
      threshold:0.7
    });
    const {ref:ref2,inView:inView2} = useInView({
      triggerOnce: true,
      threshold:0.7
    });
    const {ref:ref3,inView:inView3} = useInView({
      triggerOnce: true,
      threshold:0.7
    });
    const {ref:ref4,inView:inView4} = useInView({
      triggerOnce: true,
      threshold:0.7
    });

    // const [DivViews,setDV] = useState({inView1:false,inView2:false,inView3:false,inView4:false})

    const ScrolToTop = ()=>{
      window.scrollTo({top: 0, behavior:'smooth'});
    }
    

    useEffect(()=>{
      
      setTimeout(()=>{
        if(n1 <= 5000)
        setN1((prev)=>prev+1);
      },10)

      setTimeout(()=>{
        if(n2 <= 1000)
        setN2((prev)=>prev+1);
      },10)

      setTimeout(()=>{
        if(n3 <= 100)
          setN3((prev)=>prev+1);
      },30)

      setTimeout(()=>{
        if(n4 <= 10000)
          setN4((prev)=>prev+1);
      },.1)

    },[n1,n2,n3,n4]);

  return (
    <div className={"HomeBaseDiv "+((Theme)?"ThemeDarkBG":"ThemeLightBG")} >

        <div className='NavDivOnHome'><Navbar/></div>

        <div className='HomeMainDiv CenterFication'>

          <div className={'HomeHeroDiv CenterFication '}>

            <div className="HeroContentDiv CenterFication">
              <p className='HeroHeadLine'>Turning Moments into Memories</p>
              <p className='HeroSubHeadLine'>Experience the Magic of Perfectly Curated Events</p>
              <p className="HeroDescription">At <span className='AppNameOnPara'>EventCraft</span>, we believe that every event is a chapter in the story of your life. From intimate gatherings to grand celebrations, our dedicated team is here to craft unforgettable moments with passion and precision. Let us handle the details so you can focus on creating memories that will last a lifetime.</p>
              <div className='RaisingNumbers CenterFication'>
                <div className="raisenumber num-1  CenterFication" >
                  <div className="raisenumbericon"><EventAvailableIcon/></div>
                  <div className="raisingnumber">{n1}+</div>
                  <div className="raisingnumcontent">Events</div>
                </div>
                <div className="raisenumber num-2  CenterFication">
                  <div className="raisenumbericon"><CalendarTodayIcon/></div>
                  <div className="raisingnumber">{n2}+</div>
                  <div className="raisingnumcontent">Event Manager</div>
                </div>
                <div className="raisenumber num-3  CenterFication">
                  <div className="raisenumbericon"><PublicIcon/></div>
                  <div className="raisingnumber">{n3}+</div>
                  <div className="raisingnumcontent">Countries</div>
                </div>
                <div className="raisenumber num-4  CenterFication">
                  <div className="raisenumbericon"><GroupAddIcon/></div>
                  <div className="raisingnumber">{n4}+</div>
                  <div className="raisingnumcontent">People's</div>
                </div>
              </div>
              <div className='GetStartedDiv' onClick={(event)=>{navi('/Events');ScrolToTop()}}>Get Started</div>
            </div>
            <div className="HeroImageDiv"></div>

            {/* <div className={"HeroDesigndiv HeroDD-1 "+((Theme)?"Dark":"Light")}></div>
            <div className={"HeroDesigndiv HeroDD-2 "+((Theme)?"Dark":"Light")}></div> */}
          </div>

          <div className='HomenonHeroContentDiv CenterFication'>
            <div className={'HomeContent HCdiv-1 CenterFication '+((inView1)?"LetterCameDiv":"")}>
              {/* <div ref={ref1} className={'HContentDiv HCD-1 '+((inView1)?"LetterCameOut":"")}> */}
              <div ref={ref1}  className={'HContentDiv HCD-1 '+((inView1)?"LetterCameOut":"")}>
                <div className='HCDDesignDiv-1'></div>
                <p className='HContentHeading HCH-1'>Your Event, Our Expertise – A Match Made in Heaven!</p>
                <p className='HContentContext'>From concept to execution, our comprehensive suite of event management services covers every aspect of your event. Need creative planning, logistics coordination, or on-site management? We've got you covered! Explore our services and discover how we can turn your event into a spectacular success.</p>
                <div className="HContentButton GetStartedDiv" onClick={(evnet)=>{navi('/Events');ScrolToTop();}}>Event</div>
              </div>
              <div className='HImageDiv HIdiv-1' ></div>
            </div>
            <div className={'HomeContent HCdiv-2 CenterFication '+((inView2)?"LetterCameDiv":"")}>
              <div className='HImageDiv HIdiv-2'></div>
              <div ref={ref2}  className={'HContentDiv HCD-2 '+((inView2)?"LetterCameOut":"")}>
                <div className='HCDDesignDiv-2'></div>
                <p className='HContentHeading HCH-2'>Personal Touches</p>
                <p className='HContentContext'>You don’t only want a beautiful event, you want it to be YOUR beautiful event. We believe that behind every event is a story. So, whether it’s a bespoke escort card display or creative ways to make each guest feel included, we’re here to help you tell your story.</p>
                <div className="HContentButton GetStartedDiv" onClick={(evnet)=>{navi('/Events');ScrolToTop()}}>Event</div>
              </div>
            </div>
            <div className={'HomeContent HCdiv-3 CenterFication '+((inView3)?"LetterCameDiv":"")}>
              <div ref={ref3}  className={'HContentDiv HCD-3 '+((inView3)?"LetterCameOut":"")}>
                <div className='HCDDesignDiv-3'></div>
                <p className='HContentHeading HCH-3'>Meet the Masters of Event Perfection!</p>
                <p className='HContentContext'>At <span className='AppNameOnPara'>EventCraft</span>, we believe in the power of perfectly planned events. Our dedicated team of professionals brings passion, precision, and a touch of magic to every project. With years of experience and countless successful events under our belt, we turn your dreams into reality. Discover who we are and what drives us.</p>
                <div className="HContentButton GetStartedDiv" onClick={(evnet)=>{}}>Managers</div>
              </div>
              <div className='HImageDiv HIdiv-3'></div>
            </div> 
            <div className={'HomeContent HCdiv-4 CenterFication '+((inView4)?"LetterCameDiv":"")}>
              <div className='HImageDiv HIdiv-4'></div>
              <div ref={ref4} className={'HContentDiv HCD-4 '+((inView4)?"LetterCameOut":"")}>
                <div className='HCDDesignDiv-4'></div>
                <p className='HContentHeading HCH-4'>Love Notes</p>
                <p className='HContentContext'>Don’t just take our word for it – hear from those who have experienced the magic of our events. Our clients rave about our attention to detail, creativity, and professionalism. Read their stories and discover why <span className='AppNameOnPara'>EventCraft</span> is their top choice for unforgettable events. We value their feedback and are proud to share their testimonials.</p>
                <div className="HContentButton GetStartedDiv" onClick={(evnet)=>{}}>Reviews</div>
              </div>
            </div> 
          </div>
        </div>
              <div className='FooterDivOnHome'>
                <Footer/>
              </div>
    </div>
  )
}

export default Home