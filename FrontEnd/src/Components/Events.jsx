import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../Assets/Css/Event.css'
import { Context } from './GlobeData'
import { getAllEvents } from '../Assets/Api/EventApi'
// import { Add } from '@mui/icons-material'
import { Carousel } from 'react-responsive-carousel'

const Events = () => {

    const {Theme} = useContext(Context);

    const [Events,setEvents]= useState([]);

    useEffect(()=>{
        
        const FetchEvents =async()=>{
            const res = await getAllEvents();
            setEvents(res.data || []);
        }

        FetchEvents();

    },[])

  return (
    <div className={"EventBaseDiv "+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>
        <div className="NavDivOnEvent">
            <Navbar/>
        </div>


        <div className="EventMainDiv CenterFication">
            <div className="EventOrganisingButton">
                Oraganise
            </div>
        <div className="EventShowCaseDiv">
            <Carousel>
                {Events.slice(5).map((event)=>(
                    <div className='EventShowCaseImgDiv'>
                        
                    </div>
                ))}
            </Carousel>
        </div>
            {Events.map((event,index)=>(
                <div className={'EventContents '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")} key={index}>
                    Event - {index +1}
                </div>
            ))}
        </div>

        <div className="FooterDivOnEvent">
            <Footer/>
        </div>

    </div>
  )
}

export default Events