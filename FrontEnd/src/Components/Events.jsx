import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../Assets/Css/Event.css'
import { Context } from './GlobeData'
import { useNavigate } from 'react-router-dom'
import { GetEventsByParticipant, getPublicComEvents, getPublicOGEvents, JoinInEvent } from '../Assets/Api/EventApi';
import RatingStar from './RatingStar';
import toast from 'react-hot-toast'
import Boy from '../Assets/Datas/AboutData'
import { EventFee, EventPlace, EventTypes } from '../Assets/Datas/EventData'
import { getUserById } from '../Assets/Api/UserApi'

const Events = () => {

    const {Theme,User,LoggedIn,Update} = useContext(Context);

    const [ExEvents,setEE] = useState([]);
    const [Events,setEvents]= useState([]);
    const [dispDiv,setDD] = useState("Event");
    const [changes,setChanges] = useState(false);
    const [SelectValues,setSV] = useState({type:"",place:"",fee:""})
    const [search,setSearch] = useState("");
    const [StateOfCard,setSOC] = useState([]);

    const navi = useNavigate();

    useEffect(()=>{
        
        const FetchEvents =async()=>{

            if(dispDiv === "Event")
            {
                const res = await getPublicOGEvents();
                const ee = res.data.filter((event)=>{
                    if(event !== null && event.participants !== null && event.participants.length === 0) return true;
                    const exi = event.participants.findIndex(({user})=>user.id === User.id)
                    if(exi === -1)
                        return true;
                    return false;
                })
                setEE(ee || []);
                setEvents(ee || []);
            }
            else if(dispDiv === "PassedE")
            {
                const res = await getPublicComEvents();
                setEE(res.data || []);
                setEvents(res.data || []);
            }
            else
            {
                const res = await GetEventsByParticipant(User.id);
                setEE(res.data || []);
                setEvents(res.data || []);
            }
            
            setSOC(Events.filter(()=>false));
        }

    
        const Rotate = () =>{
            const Div = document.querySelector(".HeadingInnerDiv");
            if(dispDiv === "Event")
                Div.style.transform = "rotateX(0deg)";
            else if(dispDiv === "PE")
                Div.style.transform = "rotateX(-120deg)";
            else if(dispDiv === "PassedE")
                Div.style.transform = "rotateX(-240deg)";
        }
        FetchEvents();
        Rotate();

    },[dispDiv,changes])

    useEffect(()=>{
        let filtered = ExEvents;

        if(SelectValues.type !== "")
            filtered = filtered.filter((event)=>event.type.toLowerCase() === SelectValues.type.toLowerCase());
        if(SelectValues.place !== "")
            filtered = filtered.filter((event)=>event.place.toLowerCase() === SelectValues.place.toLowerCase());
        if(SelectValues.fee !== "")
            {   
                const val = parseInt(SelectValues.fee);
                if(val === 0)
                    filtered = filtered.filter((event)=>event.fee === 0);
                else if(val === 100)
                    filtered = filtered.filter((event)=>event.fee < 100 && event.fee >= 1);
                else if(val === 500)
                    filtered = filtered.filter((event)=>event.fee <= 500 && event.fee >= 100);
                else if(val === 1000)
                    filtered = filtered.filter((event)=>event.fee <= 1000 && event.fee >= 500);
                else if(val === 5000)
                    filtered = filtered.filter((event)=>event.fee <= 5000 && event.fee >= 1000);
                else if(val === 10000)
                    filtered = filtered.filter((event)=>event.fee <= 10000 && event.fee >= 5000);
                else
                    filtered = filtered.filter((event)=> event.fee >= 10000);
            }

        setEvents(filtered);
        
        setSOC(filtered.filter(()=>false));

    },[SelectValues])

    const FlipTheCard = (event,ind)=>{
            const newArr = [...StateOfCard];
            newArr[ind] = !newArr[ind];
            setSOC(newArr);
    }

    const TriggerSerach =()=>{

        
        if(search === "")
        {
            console.log(search);
            setChanges(!changes);
            return;
        }
        const filtered = Events.filter((event)=>
        event.ename.toLowerCase().includes(search.toLowerCase()) || event.id === search);
        setEvents(filtered);
    }

    const HandleJoin = async(eid) =>{
        const{data:d} = await JoinInEvent(eid,User.id);
        console.log(d);
        
        const res = await getUserById(User.id)
        Update(res.data);

        setChanges(!changes);
    }

    const Image = (type)=>{
        for(const E in EventTypes)
        {
            const e = EventTypes[E];
            if(e.tname === type)
            return e.img;
        }
        return null;
    }

  return (
    <div className={"EventBaseDiv "+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>
        <div className="NavDivOnEvent">
            <Navbar/>
        </div>


        <div className="EventMainDiv CenterFication">
            {(LoggedIn && User?.mana !== true)?<div className="EventOrganisingButton" onClick={()=>navi('/EventBooking')}>
                Book Now
            </div>:null}
        {/* <div className="EventShowCaseDiv">

        </div> */}
        <div className={"EventContentDiv "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
            <div className="HeadingOnECD">
                <div className="HeadingInnerDiv">
                    <div className="HeadingDivOnECD HECD-1" onClick={()=>{if(LoggedIn)setDD("PE")}}>Events</div>
                    <div className="HeadingDivOnECD HECD-2" onClick={()=>{setDD("PassedE")}}>Participated Events</div>
                    <div className="HeadingDivOnECD HECD-3" onClick={()=>{setDD("Event")}}>Passed Events</div>
                </div>
            </div>
            <div className='OptionsDivOnECD'>
                <div className="OptionsOnECD OOECD-1">
                    <select onChange={(e)=>{setSV({...SelectValues,type:e.target.value})}}>
                        <option value="" selected disabled hidden>Select Event Type</option>
                        {EventTypes.map((E,index)=>
                        <option key={index} value={E.tname}>{E.tname}</option>)}
                    </select>
                </div>
                <div className="OptionsOnECD OOECD-2">
                    <select onChange={(e)=>{setSV({...SelectValues,place:e.target.value})}}>
                        <option value="" selected disabled hidden>Select Event Place</option>
                        {EventPlace.map((E,index)=>
                        <option key={index} value={E.place}>{E.place}</option>)}
                    </select>
                </div>
                <div className="OptionsOnECD OOECD-3">
                    <select onChange={(e)=>{setSV({...SelectValues,fee:e.target.value})}}>
                        <option value="" selected disabled hidden>Select Event Fee</option>
                        {EventFee.map((E,index)=>
                        <option key={index} value={E.val}>{E.fee}</option>)}
                    </select>
                </div>
                <div className="OptionsOnECD OOECD-4">
                    <input type='text'  value={search} placeholder='Search' onChange={(event)=>{setSearch(event.target.value)}} onKeyDown={(event)=>{if(event.key === "Enter")TriggerSerach()}}/>
                </div>
            </div>
            <div className="EventListDivOnECD">
                {(Events.length !== 0)?Events.map((event,index)=>
                    <div className={`EventCardECD ECECD-${index}`} onMouseEnter={()=>{const div = document.querySelector(`.ECECD-${index}`);div.classList.add("LiftUpMagic")}} onMouseLeave={()=>{const div = document.querySelector(`.ECECD-${index}`);div.classList.remove("LiftUpMagic")}}>
                        <div className="InnerEventCardECO" style={{transform:StateOfCard[index]?"rotateY(180deg)":""}} onClick={(e)=>{FlipTheCard(e,index)}}>
                            <div className="FrontEventCardECO">
                                <div className="TopDivOnFrontEventCardECO">
                                    <div className="EImageONTDFECECO">
                                        <img src={Image(event.type)} style={{width:"100%" ,height:"100%"}} alt={event.ename}/>
                                    </div>
                                    <div className="ENameONTDFEECO">{event.ename}</div>
                                </div>
                                <div className="MidDivOnFrontEventCardECO">
                                    <div className="EDescONTDFEECO">{event.description}</div>
                                </div>
                                <div className="BotDivOnFrontEventCardECO">
                                    <div className='HeadingONBDFE'>Place</div><div className='ContentONBDFE'>{event.place}</div>
                                    <div className='HeadingONBDFE'>Type</div><div className='ContentONBDFE'>{event.type}</div>
                                    <div className='HeadingONBDFE'>Date</div><div className='ContentONBDFE'>{new Date(event.eventdateTime).toLocaleDateString()}</div>
                                    <div className='HeadingONBDFE'>Time</div><div className='ContentONBDFE'>{new Date(event.eventdateTime).toLocaleTimeString()}</div>
                                    {(dispDiv !== "PassedE")?<div className='DaysToEventONBDFE' style={{color:(new Date(event.eventdateTime).getDate()-new Date().getDate() > 3)?"blue":"red"}}>
                                        {new Date(event.eventdateTime).getFullYear()-new Date().getFullYear() > 0 ? (new Date(event.eventdateTime).getFullYear()-new Date().getFullYear() +" Year "):
                                        new Date(event.eventdateTime).getMonth()-new Date().getMonth() > 0 ? (new Date(event.eventdateTime).getMonth()-new Date().getMonth() +" Month "):
                                        new Date(event.eventdateTime).getDate()-new Date().getDate() > 0 ?new Date(event.eventdateTime).getDate()-new Date().getDate()+" Days ":"Event is OnGoing"}
                                        To The Event</div>:null}               
                                    {(dispDiv === "Event" && User.id !== event.organiser.id)?<div className="JoinNowOnBDFE">JoinNow<div className='JoinButOnBDFE' onClick={(e)=>{e.stopPropagation();if(!LoggedIn){toast.success("Sign In To Join");setTimeout(()=>{navi('/Sign')},2500)}else HandleJoin(event.id)}}>{(event.fee > 0)?event.fee:"Free"}</div></div>:null}
                                    {(dispDiv === "PassedE")?<div className='DaysToEventONBDFE'>Participated People {event?.participants?event.participants.length:0}</div>:null}
                                </div>
                            </div>
                            <div className="BackEventCardECO">
                                <div className="TopDivOnBackEventCardECO CenterFication">
                                    <div className="ProfImgONTDOBECECO">
                                        <img src={event.organiser.profImg?event.organiser.profImg:Boy} style={{width:"100%",height:'100%'}} alt={event.organiser.uname} />
                                    </div>
                                    <div className="NameONTDOBECECO">
                                        <div className='OrDts-1'>{event.organiser.uname}</div>
                                        <div className='OrDts-2'>Organiser</div>
                                    </div>
                                    <div className='OtherDtsONTDOBECECO'>{event.organiser.description}</div>
                                </div>
                                <div className="BotDivOnBackEventCardECO CenterFication">
                                    <div className="ProfImgONBDOBECECO">
                                    <img src={event.manager.profImg?event.manager.profImg:Boy} style={{width:"100%",height:'100%'}} alt={event.manager.firstname} />
                                    </div>
                                    <div className="NameONBDOBECECO">
                                    <div className='OrDts-1'>{event.manager?.firstName+" "+event.manager?.lastName}</div>
                                    <div className='OrDts-2'>Manager</div>
                                    <RatingStar reviews={event.manager.review} />
                                    </div>
                                    <div className='OtherDtsONTDOBECECO'>
                                        {}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ):<div className='EventNotFoundONDB'>No Events!</div>}
            </div>
        </div>
        </div>

        <div className="FooterDivOnEvent">
            <Footer/>
        </div>

    </div>
  )
}

export default Events