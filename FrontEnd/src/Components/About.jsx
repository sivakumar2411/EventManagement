import React, { useContext, useEffect, useState } from 'react'
import { Context } from './GlobeData';
import '../Assets/Css/About.css'
import Navbar from './Navbar';
import Footer from './Footer';
import { AboutBot_Data, catImg } from '../Assets/Datas/AboutData';

const About = () => {

    const { Theme } = useContext(Context);

    // const [currentInd,setCI] = useState(0);

    // const WhatisNow = (event) => {
    //   const DivHeight = window.innerHeight;
    //   const ScrollPosi = event.target.scrollTop;
    //   console.log(ScrollPosi,DivHeight)
    //   const Ind = Math.floor(ScrollPosi/DivHeight);
    //   console.log(Ind)
    //   setCI(Ind)
    // }

    // useEffect(()=>{
    //   const container = document.querySelector('.AboutContentsDiv');
    // container.addEventListener('scroll', WhatisNow);

    // return () => {
    //   container.removeEventListener('scroll', WhatisNow);
    // };
    // },[])

  return (
    <div className={"AboutBaseDiv "+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>

        <div className='NavDivOnAbout'><Navbar/></div>

        <div className='AboutMainDiv CenterFication'>

        {/* <div className="AboutContents AODD CenterFication">
          <div className="AImageDiv AIDiv-1"></div>
          <div className="AContentDiv ACDiv-1">
            <div className="AContentHeading ACHDiv-1"></div>
            <div className="AContentContext ACCDiv-1"></div>
          </div>
        </div>
        <div className="AboutContents AEVEN CenterFication">
          <div className="AContentDiv ACDiv-2">
            <div className="AContentHeading ACHDiv-2"></div>
            <div className="AContentContext ACCDiv-2"></div>
          </div>
          <div className="AImageDiv AIDiv-2"></div>
        </div>
        <div className="AboutContents AODD CenterFication">
          <div className="AImageDiv AIDiv-3"></div>
          <div className="AContentDiv ACDiv-3">
            <div className="AContentHeading ACHDiv-3"></div>
            <div className="AContentContext ACCDiv-3"></div>
          </div>
        </div>
        <div className="AboutContents AEVEN CenterFication">
          <div className="AContentDiv ACDiv-4">
            <div className="AContentHeading ACHDiv-4"></div>
            <div className="AContentContext ACCDiv-4"></div>
          </div>
          <div className="AImageDiv AIDiv-4"></div>
        </div> */}

        <div className="AboutContentsDiv">

          {AboutBot_Data.map((data,index)=>(
            <div className={"AboutContent "+((Theme)?"ThemeDarkDiv ":"ThemeLightDiv ")+((index%2 === 1)?"ACODD":"ACEVEN")} key={index}>
              {(index%2 === 0)?<>
                <div></div>
              <div className='AboutContexts'>
                <div className='AboutContextHeading'>{data.heading}</div>
                <div className='AboutContexts'>{data.content}</div>
              </div>
              <div className='AboutContentCatImage'>
                <img src={data.image} alt={data.heading}/>
              </div></>:<>
                <div className='AboutContentCatImage'>
                  <img src={data.image} alt={data.heading}/></div>
                <div className='AboutContexts'>
                  <div className='AboutContextHeading'>{data.heading}</div>
                  <div className='AboutContexts'>{data.content}</div>
                </div>
                <div></div>
              </>}
            </div>))}
        </div>

        <div className="ReviewsDiv">
          Reviews
        </div>

        <div className={"ContactUsDiv "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
          <div className="ContactUsForm">
            <p>Contact Us</p>
            {(false)?<></>:
            <form className={'CenterFication '+((Theme)?"Dark":"Light")} onSubmit={(event)=>{event.preventDefault();}}>
              {/* <label>Name</label> */}
              <input type='text' className='ContactName' placeholder='Name'></input>
              {/* <label>Email</label> */}
              <input type='email' className='ContactEmail' placeholder='Email'></input>
              {/* <label>Phone No</label> */}
              <input type='text' className='ContactPhoneNo' placeholder='PhoneNo'></input>
              {/* <label>Message</label> */}
              <textarea className='ContactMessage' placeholder='Message'></textarea>
              <button type='submit' className='ContactUSButton'>Send</button>
            </form>
            }
          </div>
          <div className="ContactUsImageDiv">
            <img src={catImg.Cont} alt='Contact'/>
          </div>
        </div>

        </div>

        <div className='FooterOnAboutDiv'><Footer/></div>

    </div>
  )
}

export default About